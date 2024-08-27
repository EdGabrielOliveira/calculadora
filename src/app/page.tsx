"use client";

import React, { useState } from "react";

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>("");
  const [operacaoEmAndamento, setOperacaoEmAndamento] = useState<boolean>(false);

  const addNumber = (input: string) => {
    if (operacaoEmAndamento) {
      if (["+", "-", "*", "/"].includes(input)) {
        // Adiciona o operador após o resultado da operação anterior, preservando o resultado
        const ultimoCaractere = display.charAt(display.length - 1);
        if (["+", "-", "*", "/"].includes(ultimoCaractere)) {
          // Se o último caractere também é um operador, substitui-o pelo novo operador
          setDisplay((prevDisplay) => prevDisplay.slice(0, -1) + " " + input + " ");
        } else {
          // Adiciona o operador normalmente
          setDisplay((prevDisplay) => prevDisplay + " " + input + " ");
        }
      } else {
        // Adiciona um número após o resultado
        setDisplay(input);
        setOperacaoEmAndamento(false);
      }
    } else {
      const ultimoCaractere = display.charAt(display.length - 1);
      if (
        ["+", "-", "*", "/"].includes(input) &&
        ["+", "-", "*", "/"].includes(ultimoCaractere)
      ) {
        // Se o último caractere é um operador e o novo caractere também é um operador, substitui o operador
        setDisplay((prevDisplay) => prevDisplay.slice(0, -1) + " " + input + " ");
      } else {
        // Adiciona o número ou operador normalmente
        setDisplay((prevDisplay) => prevDisplay + input);
      }
    }
  };

  const calcular = () => {
    try {
      // Calcula a expressão atual
      const resultado = eval(display.replace(/[^-()\d/*+.]/g, "")); // Remove caracteres inválidos
      if (typeof resultado === "number" && !isNaN(resultado)) {
        setDisplay(resultado.toString());
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

  const clear = () => {
    setDisplay("");
    setOperacaoEmAndamento(false);
  };

  const delet = () => {
    setDisplay((prevDisplay) => {
      // Remove o último caractere, considerando se é um espaço adicional
      const novoDisplay = prevDisplay.slice(0, -1);
      return novoDisplay.endsWith(" ") ? novoDisplay.slice(0, -1) : novoDisplay;
    });
  };

  const elevarAoQuadrado = () => {
    try {
      const resultado = eval(display.replace(/[^-()\d/*+.]/g, "")); // Remove caracteres inválidos
      if (typeof resultado === "number" && !isNaN(resultado)) {
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
    <main className="flex flex-col justify-center items-center gap-10 pt-32">
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
    </main>
  );
};

export default App;
