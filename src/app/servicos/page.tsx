import Image from "next/image";

export default async function ServicosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-dark mb-6">
              Nossos Serviços
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça os serviços que oferecemos para a comunidade acadêmica e sociedade
            </p>
          </div>
        </div>
      </section>

      {/* Ação Social Section */}
      <section className="py-24 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-dark mb-6">Ação Social</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Desenvolvemos projetos que impactam positivamente nossa comunidade, promovendo inclusão e desenvolvimento social.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/images/servicos/acao_social_1.png"
                  alt="Ação Social 1"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/images/servicos/acao_social_2.png"
                  alt="Ação Social 2"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/images/servicos/acao_social_3.png"
                  alt="Ação Social 3"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pesquisas Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-dark mb-6">Pesquisas de Campo</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Realizamos pesquisas nas ruas para entender melhor as necessidades da comunidade e do mercado local.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/images/servicos/consultoria_1.png"
                  alt="Pesquisa 1"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/images/servicos/consultoria_2.png"
                  alt="Pesquisa 2"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eventos Section */}
      <section className="py-24 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-dark mb-6">Eventos Acadêmicos</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Organizamos eventos exclusivos dentro da faculdade com vagas limitadas, proporcionando experiências únicas para os alunos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/images/servicos/eventos_1.png"
                  alt="Evento 1"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/images/servicos/eventos_2.png"
                  alt="Evento 2"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
