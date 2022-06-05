import { useState, useEffect } from "react";
const d3 = require("d3-sparql");
import { useRouter } from "next/router";
import Card from "../Components/Card";
import LoadingState from "../Components/LoadingState";

function Search({ keyword, data }) {
    const [isLoading, setIsLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState(keyword);
    const [category, setCategory] = useState("all");

    const Router = useRouter();

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };
    const handleSelectChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSearch = (e) => {
        setIsLoading(true);
        e.preventDefault();
        Router.push({ pathname: "/", query: { type: category, keyword: searchKeyword } });
        setIsLoading(false);
    };

    const handleClick = (data) => {
        setDetailData(data);
        setShowModal(true);
    };

    return (
        <section className="relative">
            <header className="top-0 py-10">
                <div className="container mx-auto flex items-center justify-center flex-col">
                    <h1 className="text-3xl font-bold">Data Makanan dan Minuman</h1>
                    <form className="flex gap-4 w-full mt-6" onSubmit={handleSearch}>
                        <div className="flex-[1]">
                            <div className="input mt-6 overflow-hidden rounded-lg cursor-pointer p-0">
                                <select
                                    className="w-full h-full outline-none border-0 cursor-pointer input"
                                    onChange={handleSelectChange}
                                >
                                    <option value="all">Semua</option>
                                    <option value="kategori">Kategori</option>
                                    <option value="merk">Merk</option>
                                    <option value="jumlah">Jumlah</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex-[3] relative">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="input mt-6 rounded-lg w-full"
                                value={searchKeyword}
                                placeholder="Masukkan kata kunci"
                                onChange={handleSearchChange}
                            />
                        </div>
                    </form>
                </div>
            </header>
            <main className="container mx-auto py-6 min-h-[61vh] flex flex-col items-center">
                {isLoading && <LoadingState />}
                {data.length > 0 ? (
                    keyword == "" ? (
                        <div className="flex gap-2 items-center">
                            <h2 className="font-normal text-lg text-grey-3 text-center">
                                Menampilkan semua data makanan/minuman
                            </h2>
                        </div>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <h2 className="font-normal text-lg text-grey-3 text-center">
                                Menampilkan hasil pencarian &quot;
                                <span className="font-semibold">{Router.query.keyword}</span>&quot;
                            </h2>
                        </div>
                    )
                ) : (
                    <div className="flex gap-2 items-center">
                        <h2 className="font-normal text-lg text-grey-3 text-center">
                            Tidak ada data makanan/minuman &quot;
                            <span className="font-semibold">{Router.query.keyword}</span>&quot;
                        </h2>
                    </div>
                )}

                <section className="card-container grid grid-cols-6 gap-x-3 gap-y-5 mt-6">
                    {data.map((barang, index) => (
                        <Card
                            key={`barang-${index}`}
                            onClick={() => handleClick(barang)}
                            tag={barang.kategori}
                            nama={barang.nama}
                            merk={barang.merk}
                            jumlah={barang.jumlah}
                        ></Card>
                    ))}
                </section>

            </main>
        </section>
    );
}

const getQuery = (word) => {
    let query;
    switch (word) {
        case "all":
            query = "o";
            break;
        case "kategori":
            query = "kategori";
            break;
        case "merk":
            query = "merk";
            break;
        case "jumlah":
            query = "jumlah";
            break;
        default:
            query = "o";
            break;
    }
    return query;
};

export async function getServerSideProps({ query }) {
    const keyword = query.keyword ? query.keyword : "";
    const type = query.type ? getQuery(query.type) : "o";

    console.log("http://localhost:3030/data/query")

    const rdfUrl = "http://localhost:3030/data/query";

    const queryRdf = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX d:  <http://learningsparql.com/ns/data#> 
        PREFIX c: <http://learningsparql.com/ns/barang#> 
    
        SELECT DISTINCT ?nama ?merk ?kategori ?jumlah
        WHERE { ?barang rdf:type ?Barang.
            ${keyword == "" ? "" : type == "o" ? "?barang ?p ?o." : ""}
            ?barang c:nama ?nama.
            ?barang c:merk ?merk.
            ?barang c:jumlah ?jumlah.
            ?barang c:kategori ?kategori.
            ${keyword == "" ? "" : `FILTER (regex(str(?${type}), "${keyword}", "i"))`}}
        GROUP BY ?nama ?merk ?kategori ?jumlah
        ${keyword == "" ? "" : type == "o" ? "?o" : ""}
`;

    const data = await d3.sparql(rdfUrl, queryRdf);

    return {
        props: {
            keyword,
            data,
        },
    };
}

export default Search;
