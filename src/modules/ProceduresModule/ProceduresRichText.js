import { Editor } from "@tinymce/tinymce-react";
import { nanoid } from "nanoid";
import { useRef } from "react";

const ProceduresRichText = ({ onEditorChange, value }) => {
  const editorRef = useRef(null);

  const handleEditorChange = (content) => {
    onEditorChange(content);
  };

  const uploadVideo = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);

      if (editorRef.current) {
        const editor = editorRef.current.editor;
        editor.insertContent(
          `<video controls><source src="${videoUrl}" type="video/mp4"></video>`
        );
      }
    }
  };

  const handleEditorInit = (editor) => {
    editor.ui.registry.addButton("uploadvideo", {
      text: "Upload Video",
      onAction: () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "video/*");
        input.onchange = uploadVideo;
        input.click();
      },
    });
  };

  return (
    <>
      <Editor
        ref={editorRef}
        value={value}
        apiKey="au50u78j9vjabzcr4icg4v3oknubu08ifv9rfstawlzmdobp"
        init={{
          selector: "textarea",
          menubar: true,
          resize: false,
          image_advtab: true,
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",
          table_advtab: "true",
          menubar: "format ",
          toolbar:
            "undo redo | formatselect | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code table customInsertButton customDateButton customDataAttrButton tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry uploadVideo",
          content_style: `body { font-family:'Poppins-Medium'; font-size:14px;color:#1a1a1a }`,

          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = function () {
              var file = this.files[0];

              var reader = new FileReader();
              reader.onload = function () {
                var id = "blobid" + new Date().getTime();
                var blobCache =
                  window.tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(",")[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };

            input.click();
          },
          setup: function (editor) {
            handleEditorInit(editor);
            editor.ui.registry.addButton("customInsertButton", {
              icon: "edit-block",
              tooltip: "Insert Input Element",
              onAction: function (_) {
                const value = nanoid(7);
                editor.insertContent(
                  `&nbsp;<input type='text' id='value_${value}' name='value_${value}'>&nbsp;`
                );
              },
            });

            var toTimeHtml = function (date) {
              return (
                '<time datetime="' +
                date.toString() +
                '">' +
                date.toDateString() +
                "</time>"
              );
            };

            editor.ui.registry.addButton("customVideoUpload", {
              text: "Upload Video",
              onAction: function () {
                editor.insertContent(
                  `<video width="320" height="240" controls><source src="${videoUrl}" type="video/mp4"></video>`
                );
                // if (fileInputRef.current) {
                //   fileInputRef.current.click();
                // }
              },
            });

            editor.ui.registry.addButton("customDateButton", {
              icon: "insert-time",
              tooltip: "Insert Current Date",
              disabled: true,
              onAction: function (_) {
                editor.insertContent(toTimeHtml(new Date()));
              },
              onSetup: function (buttonApi) {
                var editorEventCallback = function (eventApi) {
                  buttonApi?.setDisabled(
                    eventApi.element.nodeName.toLowerCase() === "time"
                  );
                };
                editor.on("NodeChange", editorEventCallback);
                return function (buttonApi) {
                  editor.off("NodeChange", editorEventCallback);
                };
              },
            });

            editor.ui.registry.addButton("customDataAttrButton", {
              icon: "fas fa-cog",
              tooltip: "Assign Data Attribute",
              onAction: function (_) {
                const selectedNode = editor.selection.getNode();
                const key = window.prompt("Enter data attribute key:");
                if (key) {
                  const value = window.prompt("Enter data attribute value:");
                  if (value) {
                    selectedNode.setAttribute(`data-${key}`, value);
                  }
                }
              },
            });
          },
        }}
        plugins={[
          "advlist",
          "autoresize",
          "anchor",
          "autolink",
          "charmap",
          "code",
          "fullscreen",
          "help",
          "image",
          "insertdatetime",
          "link",
          "lists",
          "media",
          "preview",
          "searchreplace",
          "table",
          "visualblocks",
          "textpattern",
          "print",
          "advtablesort",
          "paste",
          "wordcount",
          "save",
          "customDataAttrButton",
          // "powerpaste",
        ]}
        onEditorChange={handleEditorChange}
      />
    </>
  );
};

export default ProceduresRichText;
