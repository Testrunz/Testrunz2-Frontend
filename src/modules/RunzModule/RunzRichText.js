import { Editor } from "@tinymce/tinymce-react";

const RunzRichText = ({ onEditorChange, value, height }) => {
  return (
    <Editor
      onEditorChange={onEditorChange}
      value={value}
      apiKey="au50u78j9vjabzcr4icg4v3oknubu08ifv9rfstawlzmdobp"
      init={{
        height,
        selector: "textarea",
        plugins: "charmap link image code lists directionality",
        directionality: "ltr",
        menubar: "format ",
        toolbar:
          "undo redo | blocks| " +
          "charmap superscript subscript" +
          "superscript subscript bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | ",

        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
};

export default RunzRichText;
