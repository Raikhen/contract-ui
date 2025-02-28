
export default function TypeStructure({ data }) {
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((child, index) => <TypeStructure key={index} data={child} />)}
      </>
    );
  }

  const { children } = data;

  return (
    <>
      <span>{data.type} {data.text && `(${data.text.substring(0, 10)}...)`}</span>
      <div style={{ marginLeft: "1rem" }}>
        {children && children.map((child, index) => <TypeStructure key={index} data={child} />)}
      </div>
    </>
  )
}