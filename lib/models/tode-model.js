const { default: mongoose } = require("mongoose");

const TodoSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        isCompleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const TodoModel =
    mongoose.models.TodoModel || mongoose.model("TodoModel", TodoSchema);

export default TodoModel;
