import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

// PATCH: Update a task
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const task = await Task.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          message: "Task not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: task,
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

// DELETE: Delete a task
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          message: "Task not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Task deleted successfully",
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