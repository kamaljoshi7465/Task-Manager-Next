import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

// GET: Fetch all tasks
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const filter = {};

    // Search tasks by title
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by task status
    if (status) {
      filter.status = status;
    }

    const tasks = await Task.find(filter).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// POST: Create a new task
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Task title is required",
        },
        { status: 400 }
      );
    }

    const task = await Task.create({
      title: body.title.trim(),
      description: body.description || "",
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        data: task,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}