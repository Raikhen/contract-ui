export default function TypeWrapper({ type, children, bold, underline, italics, color }) {
  let style = {};

  if (bold) style = { ...style, fontWeight: "bold" };
  if (underline) style = { ...style, textDecoration: "underline" };
  if (italics) style = { ...style, fontStyle: "italic" };
  
  if (type === "mention") {
    style = {
      ...style,
      color: "white",
      backgroundColor: color,
      borderRadius: 5,
      padding: 5,
      lineHeight: 2,
    }
  }

  switch (type) {
    case "h1":
      return <h1 style={style}>{children}</h1>;
    case "h2":
      return <h2 style={style}>{children}</h2>;
    case "h3":
      return <h3 style={style}>{children}</h3>;
    case "h4":
      return <h4 style={style}>{children}</h4>;
    case "h5":
      return <h5 style={style}>{children}</h5>;
    case "h6":
      return <h6 style={style}>{children}</h6>;
    case "p":
      return <p style={style}>{children}</p>;
    case "mention":
      return <span style={style}>{children}</span>;
    case "clause":
      return <span style={style}>{children}</span>;
    case "ul":
      return <ul style={style}>{children}</ul>;
    case "li":
      return <li style={style}>{children}</li>;
    case "lic":
      return <span style={style}>{children}</span>;
    case "block":
      return <span style={style}>{children}</span>;
    default:
      return <span style={style}>{children}</span>;
  }
}