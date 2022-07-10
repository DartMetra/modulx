import { Document, Schema, model, Types } from 'mongoose';

declare interface ITest extends Document {
  name: string;
}

const TestSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const TestModel = model<ITest>('Test', TestSchema);

export default TestModel;
