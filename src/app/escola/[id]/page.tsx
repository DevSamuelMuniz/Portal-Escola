"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import dynamic from "next/dynamic";

const Mapa = dynamic(() => import("@/Components/Mapa"), {
  ssr: false, // impede renderização no servidor
});

interface Escola {
  _id: number;
  rpa: number;
  tipo_cod: number;
  tipo: string;
  cod_escola: number;
  escola: string;
  inep: number;
  rua: string;
  numero: string;
  cod_bairro: number;
  bairro: string;
  metragem: string;
  qtd_alunos: number;
  qtd_turmas: number;
  qtd_professores: number;
  escola_climatizada: string;
  data_visita: string;
  quadra_coberta: string;
  quadra_descoberta: string;
  biblioteca: string;
  sala_recurso: string;
  gestor: string;
  longitude: number;
  latitude: number;
}

export default function DetalhesEscola() {
  const { id } = useParams();
  const [escola, setEscola] = useState<Escola | null>(null);

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);
  const fetchEscolas = async () => {
    try {
      const response = await axios.get(
        "https://corsproxy.io/?https://dados.recife.pe.gov.br/api/3/action/datastore_search",
        {
          params: {
            resource_id: "7c613836-9edd-4c0f-bc72-495008dd29c3",
          },
        }
      );
      const registros: Escola[] = response.data.result.records;
      const encontrada = registros.find((item) => item.rpa.toString() === id);
      setEscola(encontrada || null);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    fetchEscolas();
  }, [id]);

  if (!escola) {
    return (
      <div className="p-10 text-center text-red-600">
        Carregando informações da escola...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-3">
      {/* Cabeçalho */}
      <header className="bg-gradient-to-r from-yellow-400 via-red-500 to-blue-700 text-white rounded-xl p-6 mb-8 shadow-md text-center">
        <h1 className="text-3xl font-bold">Escola: {escola.escola}</h1>
        <p className="text-sm mt-1">Detalhes completos da unidade escolar</p>
      </header>

      {/* Conteúdo em duas colunas */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lado esquerdo: Informações */}
        <div className="space-y-6">
          {/* Seção 1: Dados Administrativos */}
          <section className="bg-white p-3 rounded-xl shadow">
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              Dados Administrativos
            </h2>
            <div className="space-y-2">
              <p>
                <strong>INEP:</strong> {escola.inep}
              </p>
              <p>
                <strong>Gestor(a):</strong> {escola.gestor}
              </p>
              <p>
                <strong>Tipo:</strong> {escola.tipo}
              </p>
              <p>
                <strong>RPA:</strong> {escola.rpa}
              </p>
              <p>
                <strong>Data da Visita:</strong> {escola.data_visita}
              </p>
            </div>
          </section>

          {/* Seção 2: Endereço */}
          <section className="bg-white p-3 rounded-xl shadow">
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              Localização
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Rua:</strong> {escola.rua}, {escola.numero}
              </p>
              <p>
                <strong>Bairro:</strong> {escola.bairro}
              </p>
              <p>
                <strong>Cidade:</strong> Recife
              </p>
              <p>
                <strong>Latitude:</strong> {escola.latitude}
              </p>
              <p>
                <strong>Longitude:</strong> {escola.longitude}
              </p>
            </div>
          </section>

          {/* Seção 3: Estrutura da Escola */}
          <section className="bg-white p-3 rounded-xl shadow">
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              Estrutura da Escola
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Alunos:</strong> {escola.qtd_alunos}
              </p>
              <p>
                <strong>Turmas:</strong> {escola.qtd_turmas}
              </p>
              <p>
                <strong>Professores:</strong> {escola.qtd_professores}
              </p>
              <p>
                <strong>Climatizada:</strong> {escola.escola_climatizada}
              </p>
              <p>
                <strong>Biblioteca:</strong> {escola.biblioteca}
              </p>
              <p>
                <strong>Quadra Coberta:</strong> {escola.quadra_coberta}
              </p>
            </div>
          </section>
        </div>

        {/* Lado direito: Mapa */}
        <Mapa
          latitude={escola.latitude}
          longitude={escola.longitude}
          nome={escola.escola}
          bairro={escola.bairro}
        />
      </section>
    </main>
  );
}
