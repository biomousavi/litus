import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model, Types } from "mongoose";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { Todo, TodoSchema } from "./todo.schema";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";

describe("Todo Integration Tests", () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let todoModel: Model<Todo>;

  beforeAll(async () => {
    // Start in-memory MongoDB instance
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
      ],
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    todoModel = moduleFixture.get<Model<Todo>>(getModelToken(Todo.name));
  });

  afterAll(async () => {
    await app.close();
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    await todoModel.deleteMany({});
  });

  describe("POST /todo", () => {
    const createTodoDto: CreateTodoDto = {
      title: "Test Todo",
      estimated_time: 60,
    };

    it("should create a new todo", async () => {
      const response = await request(app.getHttpServer())
        .post("/todo")
        .send(createTodoDto)
        .expect(HttpStatus.CREATED);

      expect(response.body).toMatchObject({
        title: createTodoDto.title,
        estimated_time: createTodoDto.estimated_time,
      });
      expect(response.body.creation_time).toBeDefined();
      expect(response.body._id).toBeDefined();
    });

    it("should fail with invalid data", async () => {
      const invalidDto = {
        title: "", // Empty title should fail validation
        estimated_time: 60,
      };

      await request(app.getHttpServer()).post("/todo").send(invalidDto).expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe("GET /todo", () => {
    it("should return all non-deleted todos", async () => {
      // Create test todos
      const todo1 = await todoModel.create({
        title: "Todo 1",
        estimated_time: 30,
        creation_time: new Date(),
      });

      const todo2 = await todoModel.create({
        title: "Todo 2",
        estimated_time: 60,
        creation_time: new Date(),
      });

      const deletedTodo = await todoModel.create({
        title: "Deleted Todo",
        estimated_time: 90,
        creation_time: new Date(),
        deletion_time: new Date(),
      });

      const response = await request(app.getHttpServer()).get("/todo").expect(HttpStatus.OK);

      expect(response.body).toHaveLength(2);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ title: todo1.title }),
          expect.objectContaining({ title: todo2.title }),
        ]),
      );
      expect(response.body).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ title: deletedTodo.title })]),
      );
    });
  });

  describe("DELETE /todo/:id", () => {
    it("should soft delete an existing todo", async () => {
      const todo = await todoModel.create({
        title: "Todo to delete",
        estimated_time: 30,
        creation_time: new Date(),
      });

      await request(app.getHttpServer()).delete(`/todo/${todo._id}`).expect(HttpStatus.NO_CONTENT);

      const deletedTodo = await todoModel.findById(todo._id);
      expect(deletedTodo.deletion_time).toBeDefined();
    });

    it("should return 404 for non-existent todo", async () => {
      const nonExistentId = new Types.ObjectId();
      await request(app.getHttpServer()).delete(`/todo/${nonExistentId}`).expect(HttpStatus.NOT_FOUND);
    });

    it("should return 404 for already deleted todo", async () => {
      const todo = await todoModel.create({
        title: "Already deleted todo",
        estimated_time: 30,
        creation_time: new Date(),
        deletion_time: new Date(),
      });

      await request(app.getHttpServer()).delete(`/todo/${todo._id}`).expect(HttpStatus.NOT_FOUND);
    });

    it("should return 400 for invalid ObjectId", async () => {
      await request(app.getHttpServer()).delete("/todo/invalid-id").expect(HttpStatus.BAD_REQUEST);
    });
  });
});
