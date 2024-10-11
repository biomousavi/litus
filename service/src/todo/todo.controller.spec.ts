import { Test, TestingModule } from "@nestjs/testing";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { Types } from "mongoose";
import { NotFoundException } from "@nestjs/common";

describe("TodoController", () => {
  let controller: TodoController;
  let service: TodoService;

  // Mock todo service
  const mockTodoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
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

      const expectedResult = {
        _id: new Types.ObjectId(),
        ...createTodoDto,
        creation_time: new Date(),
      };

      mockTodoService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createTodoDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createTodoDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("findAll", () => {
    it("should return an array of todos", async () => {
      const expectedTodos = [
        {
          _id: new Types.ObjectId(),
          title: "Test Todo 1",
          estimated_time: 30,
          creation_time: new Date(),
        },
        {
          _id: new Types.ObjectId(),
          title: "Test Todo 2",
          estimated_time: 60,
          creation_time: new Date(),
        },
      ];

      mockTodoService.findAll.mockResolvedValue(expectedTodos);

      const result = await controller.findAll();

      expect(result).toEqual(expectedTodos);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe("remove", () => {
    it("should remove todo successfully", async () => {
      const todoId = new Types.ObjectId();
      mockTodoService.remove.mockResolvedValue(undefined);

      await controller.remove(todoId);

      expect(service.remove).toHaveBeenCalledWith(todoId);
    });

    it("should handle not found error", async () => {
      const todoId = new Types.ObjectId();
      mockTodoService.remove.mockRejectedValue(new NotFoundException(`Todo with id ${todoId} not found`));

      await expect(controller.remove(todoId)).rejects.toThrow(NotFoundException);
    });
  });
});
