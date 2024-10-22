import Container from "./layout/Container";

const DividerComponent = () => {
  return (
    <Container>
      <div className="h-[1px] my-2 w-full bg-neutral-200 dark:bg-neutral-800" />
    </Container>
  );
};

export default DividerComponent;
