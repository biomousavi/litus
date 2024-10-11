import { Test, TestingModule } from "@nestjs/testing";
import { TodoService } from "./todo.service";
import { getModelToken } from "@nestjs/mongoose";
import { Todo } from "./todo.schema";
import { Model, Types } from "mongoose";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { NotFoundException } from "@nestjs/common";

describe("TodoService", () => {
  let service: TodoService;
  let model: Model<Todo>;

  const mockTodoModel = {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken(Todo.name),
          useValue: mockTodoModel,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    model = module.get<Model<Todo>>(getModelToken(Todo.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a todo successfully", async () => {
      const createTodoDto = {
        title: "Test Todo",
        estimated_time: 60,
      };

      const mockCreatedTodo = {
        _id: "mockId",
        ...createTodoDto,
        creation_time: new Date(),
      };

      mockTodoModel.create.mockResolvedValue(mockCreatedTodo);

      const result = await service.create(createTodoDto);

      expect(result).toEqual(mockCreatedTodo);
      expect(mockTodoModel.create).toHaveBeenCalledWith({
        title: createTodoDto.title,
        estimated_time: createTodoDto.estimated_time,
        creation_time: expect.any(Date),
      });
    });
  });

  describe("findAll", () => {
    it("should return all non-deleted todos", async () => {
      const mockTodos = [
        { title: "Todo 1", estimated_time: 30 },
        { title: "Todo 2", estimated_time: 60 },
      ];

      const mockQuery = {
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockTodos),
      };

      jest.spyOn(model, "find").mockReturnValue(mockQuery as any);

      const result = await service.findAll();

      expect(result).toEqual(mockTodos);
      expect(model.find).toHaveBeenCalledWith({ deletion_time: { $exists: false } });
    });
  });

  describe("remove", () => {
    it("should soft delete an existing todo", async () => {
      const todoId = new Types.ObjectId();
      const mockTodo = {
        _id: todoId,
        title: "Test Todo",
      };

      mockTodoModel.findOneAndUpdate.mockResolvedValue(mockTodo);

      await service.remove(todoId);

      expect(mockTodoModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: todoId, deletion_time: { $exists: false } },
        { $set: { deletion_time: expect.any(Date) } },
      );
    });

    it("should throw NotFoundException when todo does not exist", async () => {
      const todoId = new Types.ObjectId();
      mockTodoModel.findOneAndUpdate.mockResolvedValue(null);

      await expect(service.remove(todoId)).rejects.toThrow(NotFoundException);
    });
  });
});
