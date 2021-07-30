import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";

const UPLOAD_MUTATION = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      filename
      mimetype
      location
    }
  }
`;

export default function UploadForm({ onComplete = f => f }) {
  const [isUploading, setUploading] = useState(false);
  const [mutate] = useMutation(UPLOAD_MUTATION, {
    onCompleted: (data) => {
      setUploading(false);
      onComplete({
        location: data.uploadImage.location,
        name: data.uploadImage.filename,
        type: data.uploadImage.mimetype
      });
    }
  })

  const onChangeHandler = (e) => {
    const [ file ] = e.target.files;
    const { type } = file;
    if (type.slice(type.lastIndexOf('/') + 1).toLowerCase() !== 'jpeg') {
      alert("The file's extension should be JPEG")
      return;
    }
    setUploading(true);

    mutate({
      variables: {
        file
      }
    });
  }

  return (
    <form>
      { isUploading && <h4>Uploading...</h4> }
      <input type="file" disabled={isUploading} onChange={(e) => onChangeHandler(e)} />
    </form>
  );
}