import { Test, TestingModule } from "@nestjs/testing";
import { TodoService } from "./todo.service";
import { getModelToken } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Todo } from "./todo.schema";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { NotFoundException } from "@nestjs/common";

describe("TodoService", () => {
  let service: TodoService;
  let model: Model<Todo>;

  const mockTodoModel = {
    new: jest.fn(),
    find: jest.fn(),
    findOneAndUpdate: jest.fn(),
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
      const createTodoDto: CreateTodoDto = {
        title: "Test Todo",
        estimated_time: 30,
      };

      const expectedTodo = {
        _id: new Types.ObjectId(),
        ...createTodoDto,
        creation_time: expect.any(Date),
      };

      const saveSpy = jest.spyOn(mockTodoModel, "save").mockResolvedValue(expectedTodo);

      mockTodoModel.new.mockReturnValue({
        ...expectedTodo,
        save: saveSpy,
      });

      const result = await service.create(createTodoDto);

      expect(result).toEqual(expectedTodo);
      expect(mockTodoModel.new).toHaveBeenCalledWith({
        ...createTodoDto,
        creation_time: expect.any(Date),
      });
      expect(saveSpy).toHaveBeenCalled();
    });
  });

  describe("findAll", () => {
    it("should return all non-deleted todos", async () => {
      const expectedTodos = [
        {
          _id: new Types.ObjectId(),
          title: "Test Todo 1",
          estimated_time: 30,
          creation_time: new Date(),
        },
      ];

      const findQuery = {
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(expectedTodos),
      };

      mockTodoModel.find.mockReturnValue(findQuery);

      const result = await service.findAll();

      expect(result).toEqual(expectedTodos);
      expect(mockTodoModel.find).toHaveBeenCalledWith({
        deletion_time: { $exists: false },
      });
    });
  });

  describe("remove", () => {
    it("should soft delete a todo successfully", async () => {
      const todoId = new Types.ObjectId();
      const mockTodo = {
        _id: todoId,
        title: "Test Todo",
        estimated_time: 30,
      };

      mockTodoModel.findOneAndUpdate.mockResolvedValue(mockTodo);

      await service.remove(todoId);

      expect(mockTodoModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: todoId, deletion_time: { $exists: false } },
        { $set: { deletion_time: expect.any(Date) } },
      );
    });

    it("should throw NotFoundException when todo not found", async () => {
      const todoId = new Types.ObjectId();
      mockTodoModel.findOneAndUpdate.mockResolvedValue(null);

      await expect(service.remove(todoId)).rejects.toThrow(NotFoundException);
    });
  });
});
