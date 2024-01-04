import supertest from "supertest";
import app from "../src/index";
import { findOneUser, generateToken } from "../src/services/user";
import { decodeToken } from "../src/utils/helper";
import { Op } from "sequelize";

let accessToken = "";

describe("Authentication API Endpoints", () => {
  test("POST /api/auth/signup should create a new user", async () => {
    const newUser = {
      firstName: "Ravi",
      lastName: "Kumar",
      username: "ravi1491856",
      email: "ravi1491856@gmail.com",
      password: "testpassword@123",
    };

    const response = await supertest(app)
      .post("/api/auth/signup")
      .send(newUser);

    if (response.body.message === "User already exists") {
      expect(response.statusCode).toBe(400);
    } else {
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("newUser");
      expect(response.body.newUser).toHaveProperty("email", newUser.email);

      accessToken = response.body.accessToken;
      // We can similary do that for all other props
    }
  });

  test("POST /api/auth/login should login a user", async () => {
    const userCredentials = {
      email: "ravi1491856@gmail.com",
      password: "testpassword@123",
    };

    const response = await supertest(app)
      .post("/api/auth/login")
      .send(userCredentials);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("accessToken");
    accessToken = response.body.accessToken;
    // We can similary do that for all other props
  });
});

describe("API Endpoints for notes", () => {
  test("GET /api/notes should get all notes", async () => {
    const response = await supertest(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("notes");
  });

  test("POST /api/notes should create a new note", async () => {
    const newNote = {
      title: "Test Note",
      description: "This is a test note.",
    };

    const response = await supertest(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(newNote);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("note");
    expect(response.body.note).toHaveProperty("title", newNote.title);
    expect(response.body.note).toHaveProperty(
      "description",
      newNote.description
    );
  });

  test("GET /api/notes/:id should get a specific note by ID", async () => {
    const newNote = {
      title: "Test Note",
      description: "This is a test note.",
    };

    const createdNoteResponse = await supertest(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(newNote);

    const response = await supertest(app)
      .get(`/api/notes/${createdNoteResponse.body.note.id}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("note");
    expect(response.body.note).toHaveProperty("title", newNote.title);
    expect(response.body.note).toHaveProperty(
      "description",
      newNote.description
    );
  });

  test("PUT /api/notes/:id should update a specific note by ID", async () => {
    const newNote = {
      title: "Test Note",
      description: "This is a test note.",
    };

    const createdNoteResponse = await supertest(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(newNote);

    const updatedNote = {
      title: "Updated Note Title",
      description: "This is the updated description.",
    };

    const response = await supertest(app)
      .put(`/api/notes/${createdNoteResponse.body.note.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send(updatedNote);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("note");
    expect(response.body.note).toHaveProperty("title", updatedNote.title);
    expect(response.body.note).toHaveProperty(
      "description",
      updatedNote.description
    );
  });

  test("DELETE /api/notes/:id should delete a specific note by ID", async () => {
    const newNote = {
      title: "Test Note",
      description: "This is a test note.",
    };

    const createdNoteResponse = await supertest(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(newNote);

    const response = await supertest(app)
      .delete(`/api/notes/${createdNoteResponse.body.note.id}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Note deleted successfully"
    );
  });

  test("POST /api/notes/:id/share should share a specific note by ID", async () => {
    const newNote = {
      title: "Test Note",
      description: "This is a test note.",
    };

    const createdNoteResponse = await supertest(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(newNote);

    const user = await decodeToken(accessToken);
    const secondUser = await findOneUser({ email: { [Op.ne]: user.email } });

    const response = await supertest(app)
      .post(`/api/notes/${createdNoteResponse.body.note.id}/share`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        targetUserId: secondUser.id,
      });

    expect(response.statusCode).toBe(200);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Note shared successfully");
  });
});

describe("API Endpoints for search notes", () => {
  test("GET /api/search should search notes based on query", async () => {
    const response = await supertest(app)
      .get("/api/search?q=test")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("notes");
  });
});
