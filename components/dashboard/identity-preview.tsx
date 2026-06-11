// components/dashboard/identity-preview.tsx


export var creator = {
  name: "Lucas da Silva Lopes",
  abreviation: "Lucas",
  class: "Creator",
  age: 11,
  school: 6,
  programation: {
    like: "Front-end",
    noLike: {
      back:"Back-end",
      full: "Full-stack"
    }
  }
}

export function IdentityPreview() {
  return (
    <section className="space-y-2">
      <h2 className="text-2xl font-semibold">
        Identidade
      </h2>

      <p>{creator.name}</p>

      <p>{creator.age} anos • {creator.school}º ano</p>

      <p>💻 {creator.programation.like}</p>
      
      

    </section>
  );
}