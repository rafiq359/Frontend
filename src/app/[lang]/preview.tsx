"use client";

import React, { Suspense } from "react";
import PDFCanvasViewer from "./components/PDFCanvasViewer";
import type { RootState } from "../GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../GlobalRedux/Features/i18n/counterSlice";

interface Params {
  slug: string;
}

interface fileParams {
  [key: string]: string | string[] | undefined;
}
function preview({
  params,
  fileParams,
}: {
  params: Params;
  fileParams: fileParams;
}) {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  console.log("fileParams", fileParams);

  return (
    <>
      <button
        className="bg-blue-400 rounded-md text-white text-lg"
        onClick={() => dispatch(increment())}
      >
        increment
      </button>
      <span>{count}</span>
      <button
        className="bg-blue-400 rounded-md text-white text-lg"
        onClick={() => dispatch(decrement())}
      >
        decrement
      </button>

      <button
        className="bg-blue-400 rounded-md text-white text-lg"
        onClick={() => dispatch(incrementByAmount(2))}
      >
        incrementBy 2
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        <PDFCanvasViewer selectedFile={fileParams as any} />
      </Suspense>
    </>
  );
}

export default preview;
