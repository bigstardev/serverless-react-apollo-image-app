import React from "react";

export default function UploadStats({
  name,
  location,
  type,
  onUploadAnother = f => f
}) {
  return (
    <div>
      <p>
        <b>name</b>: {name}
      </p>
      <p>
        <b>type</b>: {type}
      </p>
      <p>
        <a href={location}>view</a>
      </p>
      <button onClick={onUploadAnother}>Upload Another File</button>
    </div>
  );
}