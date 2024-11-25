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

// Helper para subtrair números
export const subtract = (a, b) => a - b;

// Helper para somar números
export const add = (a, b) => a + b;

// Helper para verificar se dois valores são iguais
export const eq = (a, b) => Number(a) === Number(b);

// Helper para verificar se o primeiro valor é maior que o segundo
export const gt = (a, b) => a > b;

// Helper para verificar se o primeiro valor é menor que o segundo
export const lt = (a, b) => a < b;

// Helper para gerar as páginas da navegação
export const generatePages = (currentPage, totalPages) => {
    const pagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i);
    }
    return pagesArray;
};

// Helper para verificar se há páginas
export const hasPages = (totalPages) => {
    return totalPages > 0;
};

// Exporta todos os helpers como objeto
export default {
    formatDate,
    truncate,
    subtract,
    add,
    eq,
    gt,
    lt,
    generatePages,
    hasPages
};
