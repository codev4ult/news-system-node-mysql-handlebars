export const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("pt-BR", options);
};

export const truncate = (text, length) => {
    if (text.length > length) {
        return text.substring(0, length) + "...";
    }
    return text;
};

// Exporta todos os helpers como objeto
export default {
    formatDate,
    truncate,
};
