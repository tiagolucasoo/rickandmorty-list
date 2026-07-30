import React, { useEffect, useState } from "react";
import './response.css';

function Main() {
    const [pers, setPers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchCharacters = async () => {
            let api = `https://rickandmortyapi.com/api/character/?page=${currentPage}`;

            try {
                let resp = await fetch(api);
                let data = await resp.json();

                if (data.results) {
                    setPers(data.results); 
                    setTotalPages(data.info.pages);
                }
            } catch (error) {
                console.error("Erro:", error);
            }
        };

        fetchCharacters();
        
        window.scrollTo({ 
            top: 0, 
            behavior: "smooth" 
        });
        
    }, [currentPage]);

    const getPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const statusPersonagem = (status) => {
        const dictStatus = {
            Alive: { texto: "Vivo", icone: <img src="/icon_live.png" alt="Vivo"/> },
            Dead: { texto: "Morto", icone: <img src="/icon_death.png" alt="Morto"/> },
            unknown: { texto: "Desconhecido", icone: <img src="/icon_desc.png" alt="Desconhecido"/> }
        };
        return dictStatus[status] || status;
    }

    const origemPersonagem = (origem) => {
        const origemDesc = {
            unknown: "Origem Desconhecida"
        };
        return origemDesc[origem] || origem;
    }

    return (
        <div>
            <div className="container">
                {pers.map((personagem) => (
                    <div key={personagem.id} className="card">
                        <img src={personagem.image} alt={personagem.name} className="image-card" />
                        
                        <div className="card-info">
                            <p className="name-card">{personagem.name}</p>
                            <p>{origemPersonagem(personagem.origin.name)}</p>

                            <div className="box-primario">
                                <div className="box-detalhe">
                                    <span>Espécie</span>
                                    <p>{personagem.species}</p>
                                </div>

                                <div className="box-detalhe">
                                    <span>Gênero</span>
                                    <p>{personagem.gender}</p>
                                </div>
                            </div>

                            <div className="box-secundario">
                                <p>
                                    <strong>Status: </strong>
                                    <span className={`status ${personagem.status.toLowerCase()}`}>
                                        {statusPersonagem(personagem.status).icone}
                                        {statusPersonagem(personagem.status).texto}
                                    </span>
                                </p>
                                
                                
                                <p><strong>Episódios:</strong> {personagem.episode.length}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}>
                    <img src="/esquerda.png" alt="imagem"></img>
                </button>

                {getPageNumbers().map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "active" : ""}
                    >
                        {page}
                    </button>
                ))}

                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}>
                    <img src="/direita.png" alt="imagem"></img>
                </button>
                
            </div>
        </div>
    );
}

export default Main;
