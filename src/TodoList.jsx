import React, { useState, useEffect } from "react";
import "./TodoList.css";
import Icone from './assets/icone.png';

function TodoList() {
    const listaStorage = localStorage.getItem('Lista');
    // inicialmente o useState da lista é um array vazio, alimentado com os itens que forem adicionados
    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    // novoItem corresponde ao item escrito no campo input, começanco com useState vazio
    const [novoItem, setNovoItem] = useState ("");

    useEffect(()=> {
        localStorage.setItem('Lista', JSON.stringify(lista))
    }, [lista])

    function adicionaItem (form) {
        // preventDefault é usado para que o formulário não zere as informações, o que aconteceria por padrão
        form.preventDefault();
        if(!novoItem) {
            return
        }
        setLista([...lista, {text: novoItem, isCompleted: false}]);
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function clicou (index) {
        const listaAux = [...lista];
                                    // para inverter o valor booleano de um item, basta colocar o !, como abaixo
        listaAux[index].isCompleted = !listaAux[index].isCompleted
        setLista(listaAux);
    }

    function deleta (index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux)
    }

    function deletaTudo () {
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input onClick={() => {clicou(index)}}
                id="input-entrada"
                type="text"
                placeholder="Adicione uma tarefa" 
                value={novoItem}
                onChange={(e) => setNovoItem(e.target.value)}
                />
                <button type="submit" className="add">Add</button>
            </form>
            <div style={{ textAlign: 'center' }}>
            {
                lista.length <1 
                ? 
                <img src= {Icone} id="icone"/>
                :
                lista.map((item, index) => (
                    <div 
                    key={index}
                    className={item.isCompleted ? "item completo" : "item"}
                    >
                        <span onClick={()=>{clicou(index)}}>{item.text}</span>
                        <button className="del" onClick={()=>{deleta(index)}}>Deletar</button>
                    </div>
                ))
            }
            {
                lista.length > 0 &&
                <div className="listaTarefas">
                    <button className="deleteAll" onClick={()=>{deletaTudo()}}>Deleter Todas</button>
                </div>     
            }
            </div>
        </div>
    )
}

export default TodoList;