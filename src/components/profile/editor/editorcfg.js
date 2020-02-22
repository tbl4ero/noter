import ReactQuill from "react-quill";

const Font = ReactQuill.Quill.import("formats/font");
Font.whitelist = ["Ubuntu", "Roboto", "Arvo"];
ReactQuill.Quill.register(Font, true);

export const desktopEditorCfg = { 
    formats: [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "color",
    "background",
    "align",
    "font",
    "size",
    "code-block",
    "image",
    "video"
    ], 
  modules: {
    toolbar: [
      [{ font: Font.whitelist }],
      [{ size: ["small", "normal", "large", "huge"] }],
      [{ align: [false, "right", "center"] }],
      ["bold", "italic", "underline", "strike"],
      ["code-block", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [
        {
          color: ["black", "white", "red", "blue", "yellow", "green"]
        },
        {
          background: [
            "black",
            "white",
            "red",
            "blue",
            "yellow",
            "green"
          ]
        }
      ],
      ["image", "video"],
      ["clean"]
    ]
  }
};

  export const mobileEditorCfg = {
    formats: [
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "color",
        "align",
        "image"
      ], 
    modules: {
        toolbar: [
            [{ align: [false, "right", "center"] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [
            {
                color: ["black", "white", "red", "blue", "yellow", "green"]
            }
            ],
            ["image"],
            ["clean"]
        ]
    }
  }