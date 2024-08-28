"use client";

"use client";

import React, { useState } from "react";

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>("");
  const [operacaoEmAndamento, setOperacaoEmAndamento] = useState<boolean>(false);
  const [historico, setHistorico] = useState<string[]>([]);

  const addNumber = (input: string) => {
    if (operacaoEmAndamento) {
      if (["+", "-", "*", "/"].includes(input)) {
        const ultimoCaractere = display.charAt(display.length - 1);
        if (["+", "-", "*", "/"].includes(ultimoCaractere)) {
          setDisplay((prevDisplay) => prevDisplay.slice(0, -1) + input);
        } else {
          setDisplay((prevDisplay) => prevDisplay + input);
        }
        setOperacaoEmAndamento(false);
      } else {
        setDisplay(input);
      }
    } else {
      const ultimoCaractere = display.charAt(display.length - 1);
      if (
        ["+", "-", "*", "/"].includes(input) &&
        ["+", "-", "*", "/"].includes(ultimoCaractere)
      ) {
        setDisplay((prevDisplay) => prevDisplay.slice(0, -1) + input);
      } else {
        setDisplay((prevDisplay) => prevDisplay + input);
      }
    }
  };

  const addHistorico = (operacao: string) => {
    setHistorico((prevHistorico) => [`${operacao}`, ...prevHistorico]);
  };

  const calcular = () => {
    try {
      const ultimoCaractere = display.charAt(display.length - 1);

      if (["+", "-", "*", "/"].includes(ultimoCaractere)) {
        setDisplay("Erro");
        setOperacaoEmAndamento(true);
        return;
      }

      const resultado = eval(display.replace(/[^-()\d/*+.]/g, ""));
      const expressaoValida = /[+\-*/]/.test(display); // Verifica se há um operador na expressão

      if (typeof resultado === "number" && !isNaN(resultado) && expressaoValida) {
        addHistorico(`${display} = ${resultado}`);
        setDisplay(resultado.toString());
        setOperacaoEmAndamento(true);
      } else {
        setDisplay("");
        setOperacaoEmAndamento(true);
      }
    } catch {
      setDisplay("Erro");
      setOperacaoEmAndamento(true);
    }
  };

  const clear = () => {
    setDisplay("");
    setOperacaoEmAndamento(false);
  };

  const limparHistorico = () => {
    setHistorico([]);
  };

  const delet = () => {
    setDisplay((prevDisplay) => {
      const novoDisplay = prevDisplay.slice(0, -1);
      return novoDisplay.endsWith(" ") ? novoDisplay.slice(0, -1) : novoDisplay;
    });
  };

  const elevarAoQuadrado = () => {
    try {
      const resultado = eval(display.replace(/[^-()\d/*+.]/g, ""));
      if (typeof resultado === "number" && !isNaN(resultado)) {
        setHistorico((prevHistorico) => [
          ...prevHistorico,
          `${display}^2 = ${resultado ** 2}`,
        ]);
        setDisplay((resultado ** 2).toString());
        setOperacaoEmAndamento(true);
      } else {
        setDisplay("Erro");
        setOperacaoEmAndamento(true);
      }
    } catch {
      setDisplay("Erro");
      setOperacaoEmAndamento(true);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center m-0 p-0">
      <div
        className="m-[6rem] flex flex-row justify-center items-center gap-10 bg-slate-800 w-[70rem] h-[40rem]
        rounded-xl bg-gradient-to-br from-green-900 to-purple-800 via-teal-800 bg-opacity-25"
      >
        <div className="bg-gray-200 w-[30rem] p-10 rounded-lg">
          <div className="flex flex-col justify-center items-center gap-4">
            <div>
              <input
                className="w-[26rem] h-[5rem] rounded-xl bg-gray-400 text-end p-10 text-4xl font-semibold"
                type="text"
                value={display}
                readOnly
              />
            </div>
            <div className="flex flex-row">
              <div className="grid-flow-col grid-cols-3 space-y-2">
                <div className="flex gap-2">
                  <button className="button-calc" onClick={elevarAoQuadrado}>
                    x²
                  </button>
                  <button className="button-calc" onClick={clear}>
                    C
                  </button>
                  <button className="button-calc" onClick={delet}>
                    DEL
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="button-calc" onClick={() => addNumber("7")}>
                    7
                  </button>
                  <button className="button-calc" onClick={() => addNumber("8")}>
                    8
                  </button>
                  <button className="button-calc" onClick={() => addNumber("9")}>
                    9
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="button-calc" onClick={() => addNumber("4")}>
                    4
                  </button>
                  <button className="button-calc" onClick={() => addNumber("5")}>
                    5
                  </button>
                  <button className="button-calc" onClick={() => addNumber("6")}>
                    6
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="button-calc" onClick={() => addNumber("1")}>
                    1
                  </button>
                  <button className="button-calc" onClick={() => addNumber("2")}>
                    2
                  </button>
                  <button className="button-calc" onClick={() => addNumber("3")}>
                    3
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="button-calc" onClick={() => addNumber(".")}>
                    .
                  </button>
                  <button className="button-calc" onClick={() => addNumber("0")}>
                    0
                  </button>
                  <button className="button-calc" onClick={() => addNumber("%")}>
                    %
                  </button>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-2 pl-2">
                  <button className="button-log" onClick={() => addNumber("/")}>
                    /
                  </button>
                  <button className="button-log" onClick={() => addNumber("*")}>
                    x
                  </button>
                  <button className="button-log" onClick={() => addNumber("-")}>
                    -
                  </button>
                  <button className="button-log" onClick={() => addNumber("+")}>
                    +
                  </button>
                  <button
                    className="button-log bg-blue-500 hover:bg-blue-600"
                    onClick={calcular}
                  >
                    =
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-slate-200/25 border-2 p-4 rounded-lg flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-center ">Histórico</h2>
          <div className="mt-4 overflow-scroll h-[16.5rem] w-[20rem] overflow-x-hidden overflow-y-auto">
            <ul className="list-disc pl-5">
              {historico
                .slice(0)
                .reverse()
                .map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </div>
          <button
            className="flex justify-center items-center text-center bg-blue-600 rounded-lg h-8"
            onClick={limparHistorico}
          >
            Limpar histórico
          </button>
        </div>
      </div>
      <p className="">
        Created by <a>Gabriel Oliveira</a>
      </p>
    </main>
  );
};

export default App;
