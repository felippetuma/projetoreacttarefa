import { useState, useEffect } from "react"
import '../estilo.css'

const Tarefas = () => {

    //HOOK- useState-Manipula o estado da variável
    const [tarefas, setTarefas] = useState(() => {
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });
    const [campo, setCampo] = useState("");

    //HOOK- useEffect -Realiza um efeito colateral ,nessa
    //caso atualiza a tarefa em tempo real.
    useEffect(() => {
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas))
    }, [tarefas])

    //Função Adicionar Tarefa

    const adicionarTarefa = (e) => {
        //previne a página fazer recarregamento
        e.preventDefault();
        if (!campo.trim()) return;

        // objeto
        const novaTarefa = {
            id: Date.now(),
            text: campo,
        };
        setTarefas([...tarefas, novaTarefa]); // ... -> spred
        setCampo();
    }

    const removerTarefa = (id) => {
        const apagarTarefa = tarefas.filter((tarefa) => tarefa.id !== id);
        setTarefas(apagarTarefa);
    };
    /* max-w-md mx-auto reatividade*/
    // rounded funciona com marcação de roupa
    return (
        <>
            <div className="max-w-md mx-auto p-6 bg-amber-300 rounded-3xl border border-blue-700">
                <h2 class="text-2xl font-bold p-4 text-center">Minha Lista de Tarefas</h2>
                {/* chama afunção AdicionarTarefa */}
                <form class="text-center justify-center" onSubmit={adicionarTarefa} className="todo-form" cl>
                    <input
                        type="text"
                        value={campo}
                        onChange={(e) => setCampo(e.target.value)}
                        placeholder="Digite uma nova tarefa..."
                        className="todo-input"
                    />
                    <button class="border font-medium p-2 rounded-lg hover:text-white hover:scale-95" type="submit" className="btn-adicionar">
                        Adicionar
                    </button>
                </form>

                <ul className="todo-lista" class= "p-3">
                    {tarefas.map((tarefa) => (
                        <li key={tarefa.id} className="todo-item">
                            <span>{tarefa.text}</span>
                            {/* arrow function (função seta) que encapsula a execução de outra função. 
            Ela garante que removerTarefa só seja executada quando o evento acontecer (como um clique de botão), 
            e não assim que a página carregar.
            */}
                            <button onClick={() => removerTarefa(tarefa.id)}
                                className="btn-delete"
                                class="p-4 hover:text-white "
                            >
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>
                {/* compara se nao tiver mensagems deixa  Nenhuma tarefa salva */}
                {tarefas.length === 0 && <p className="mensagem">Nenhuma tarefa salva.</p>}
            </div>
        </>
    )
}

export default Tarefas