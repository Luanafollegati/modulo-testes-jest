const {
    verificarMaioridade,
    calcularIMC,
    formatarNome,
    ehPar,
    celsiusParaFahrenheit,
    adicionarHobby,
    dividir,
    criarAluno,
    aplicarDesconto,
    validarTamanhoSenha,
} = require('./sistema');

describe('Suíte de Testes Unitários - 10 Funções Lógicas Iniciais', () => {
    test('1. verificarMaioridade', () => {
        expect(verificarMaioridade(15)).toBe(false);
        expect(verificarMaioridade(18)).toBe(true);
        expect(verificarMaioridade(21)).toBe(true);
    });

    test('2. calcularIMC', () => {
        expect(calcularIMC(70, 1.75)).toBeCloseTo(22.86, 2);
    });

    test('3. formatarNome', () => {
        expect(formatarNome('Lucas', 'Silva')).toBe('Silva, Lucas');
    });

    test('4. ehPar', () => {
        expect(ehPar(4)).toBe(true);
        expect(ehPar(7)).toBe(false);
        expect(ehPar(0)).toBe(true);
    });

    test('5. celsiusParaFahrenheit', () => {
        expect(celsiusParaFahrenheit(0)).toBe(32);
        expect(celsiusParaFahrenheit(100)).toBe(212);
        expect(celsiusParaFahrenheit(-40)).toBe(-40);
    });

    test('6. adicionarHobby', () => {
        const hobbiesIniciais = ['Futebol', 'Videogame'];
        const resultado = adicionarHobby(hobbiesIniciais, 'Leitura');

        expect(resultado).toHaveLength(3);
        expect(resultado).toEqual(['Futebol', 'Videogame', 'Leitura']);
    });

    test('7. dividir', () => {
        expect(dividir(10, 2)).toBe(5);
        expect(() => dividir(10, 0)).toThrow('Divisão por zero não permitida');
    });

    test('8. criarAluno', () => {
        const alunoEsperado = {
            nome: 'Mariana',
            curso: 'Desenvolvimento de Sistemas',
            ativo: true,
        };

        expect(criarAluno('Mariana', 'Desenvolvimento de Sistemas')).toEqual(alunoEsperado);
    });

    test('9. aplicarDesconto', () => {
        expect(aplicarDesconto(100, 10)).toBe(90);
        expect(aplicarDesconto(100, 0)).toBe(100);
    });

    test('10. validarTamanhoSenha', () => {
        expect(validarTamanhoSenha('12345')).toBe(false);
        expect(validarTamanhoSenha('senha123')).toBe(true);
        expect(validarTamanhoSenha('senhaSuperSegura2026')).toBe(true);
    });
});
