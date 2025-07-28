import Card from "./components/Card";

export default function CardImagePage() {
  const message = `부장님
    안녕하세요
    정말
    죄송
    합니다.
    이번 프로젝트에서 제가 실수를 했습니다.

    앞으로는 더욱 신중하게 일하겠습니다. 
    용서해 주시기 바랍니다.
  `;
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card recipient="부장님" message={message} cardType="cute" />
    </div>
  );
}
