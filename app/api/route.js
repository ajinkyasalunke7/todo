import { connectDb } from "@/lib/config/db";
import TodoModel from "@/lib/models/tode-model";
import { NextResponse } from "next/server";
const LoadDb = async () => {
    await connectDb();
};
LoadDb();

export async function GET(request) {
    try {
        const todos = await TodoModel.find({});
        return NextResponse.json({
            todos: todos,
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Unable to Fecth TODO's",
            status: 500,
        });
    }
}

export async function POST(request) {
    try {
        const { title, description } = await request.json();
        await TodoModel.create({
            title,
            description,
        });
        return NextResponse.json({
            message: "TODO Created",
            status: 200,
        });
    } catch (error) {
        console.log("Error occurred : " + error);
    }
}

export async function DELETE(request) {
    try {
        const mongoId = await request.nextUrl.searchParams.get("mongoId");
        const res = await TodoModel.findByIdAndDelete({ _id: mongoId });
        if (res) {
            return NextResponse.json({
                message: "TODO Deleted",
                status: 200,
            });
        }
    } catch (error) {
        console.log("Error occurred While Deleteing : " + error);
        return NextResponse.json({
            message: "Unable to Delete TODO",
            status: 500,
        });
    }
}

export async function PUT(request) {
    try {
        const mongoId = await request.nextUrl.searchParams.get("mongoId");
        const res = await TodoModel.findByIdAndUpdate(mongoId, {
            $set: {
                isCompleted: true,
            },
        });
        //console.log(res);
        return NextResponse.json({
            message: "TODO Completed",
            status: 200,
        });
    } catch (error) {
        console.log("Error occurred While Updating : R " + error);
        return NextResponse.json({
            message: "Unable to Update TODO",
            status: 500,
        });
    }
}
