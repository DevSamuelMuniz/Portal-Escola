"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import Bg from "@/assets/img/bg.png";

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

export default function Home() {
  const [escolas, setEscolas] = useState<Escola[]>([]);
  const [nomeFiltro, setNomeFiltro] = useState("");
  const [bairroFiltro, setBairroFiltro] = useState("");

  const fetchEscolas = async () => {
    try {
      const response = await axios.get(
        "http://dados.recife.pe.gov.br/api/3/action/datastore_search",
        {
          params: {
            resource_id: "7c613836-9edd-4c0f-bc72-495008dd29c3",
          },
        }
      );
      setEscolas(response.data.result.records);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    fetchEscolas();
  }, []);

  const escolasFiltradas = escolas.filter((escola) => {
    const nomeMatch = escola.escola
      .toLowerCase()
      .includes(nomeFiltro.toLowerCase());
    const bairroMatch = escola.bairro
      .toLowerCase()
      .includes(bairroFiltro.toLowerCase());
    return nomeMatch && bairroMatch;
  });

  return (
    <main>
      <div
        className="flex flex-col justify-center items-center bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url(${Bg.src})`,
        }}
      >
        <h1 className="text-white text-6xl font-bold drop-shadow-lg mb-4 animate-pulse text-center">
          PORTAL ESCOLAR
        </h1>
        <a href="#buscar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10 text-white mt-4 absolute bottom-10 animate-bounce cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
            />
          </svg>
        </a>
      </div>

      <div id="buscar" className="px-8 py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">Buscar Escolas</h2>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <input
            type="text"
            placeholder="Filtrar por nome da escola"
            value={nomeFiltro}
            onChange={(e) => setNomeFiltro(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md"
          />
          <input
            type="text"
            placeholder="Filtrar por bairro"
            value={bairroFiltro}
            onChange={(e) => setBairroFiltro(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {escolasFiltradas.map((escola, index) => (
            <a
              href={`/escola/${escola.rpa}`}
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 p-6"
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src="https://s2-g1.glbimg.com/gwz0S5WUMN4JXOdMHGTLg8cFtqI=/0x0:4992x2896/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/M/1/I9Ysv0S4WHbYBvBqG8BA/em-jose-lourenco-foto-rodolfo-loepert-pcr.jpg"
                  alt="Ícone Escola"
                  width={150}
                  height={100}
                  className="mb-4 rounded-sm shadow-md"
                />

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {escola.escola}
                </h3>

                <p className="text-sm text-gray-600">
                  Rua: {escola.rua}, {escola.numero}
                </p>

                <p className="text-sm text-gray-600 italic">
                  Bairro: {escola.bairro}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Alunos matriculados: {escola.qtd_alunos ?? "N/A"}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
