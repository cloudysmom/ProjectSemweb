function Card({ nama, tag, merk, jumlah }) {
    return (
        <div
            className="border-[1px] border-grey-1 rounded-xl px-6 py-5 flex flex-col gap-2 cursor-pointer hover:shadow-card transition-all duration-300"
        >
            <p
                className={`tag font-medium text-xs px-2 py-1 mb-2 rounded-full  text-white w-fit ${
                    tag == "Makanan" ? " bg-123" : " bg-234"
                }`}
            >
                {tag}
            </p>
            <p className="font-semibold text-base leading-[20px] text-elipsis-2">{nama}</p>
            <div className="flex gap-2 flex-col">
                <p className="merk text-sm font-light text-grey-3 text-elipsis-1">Merk : {merk}</p>
                <p>Jumlah :</p>
                <p className="jumlah text-sm font-light text-grey-3 text-elipsis-1">{jumlah} Pcs</p>
            </div>
        </div>
    );
}

export default Card;
