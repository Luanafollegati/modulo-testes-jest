const {
    ehPalindromo,
    contarVogais,
    calcularFatorial,
    removerDuplicatas,
    agendarConsulta,
    formatarMoeda,
    validarCpfBasico,
    calcularIngresso,
    ContaBancaria,
    obterClima,
} = require('./avancado');

describe('Suíte de Testes Unitários Avançados', () => {
    test('1. Verifica palíndromos', () => {
        expect(ehPalindromo('radar')).toBe(true);
        expect(ehPalindromo('Arara')).toBe(true);
        expect(ehPalindromo('javascript')).toBe(false);
        expect(ehPalindromo('')).toBe(false);
    });

    test('2. Conta vogais', () => {
        expect(contarVogais('programação')).toBe(5);
        expect(contarVogais('computador')).toBe(4);
        expect(contarVogais('xyz')).toBe(0);
    });

    test('3. Calcula fatorial', () => {
        expect(calcularFatorial(5)).toBe(120);
        expect(calcularFatorial(0)).toBe(1);
        expect(calcularFatorial(1)).toBe(1);
        expect(() => calcularFatorial(-5)).toThrow('Não existe fatorial de número negativo');
    });

    test('4. Remove duplicatas', () => {
        expect(removerDuplicatas([1, 1, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);

        expect(removerDuplicatas(['a', 'b', 'a'])).toEqual(['a', 'b']);
    });

    test('5. Valida agendamento', () => {
        const segunda = new Date(2026, 9, 26);
        const sabado = new Date(2026, 9, 24);
        const domingo = new Date(2026, 9, 25);

        expect(agendarConsulta(segunda)).toBe('Consulta agendada com sucesso');

        expect(() => agendarConsulta(sabado)).toThrow('Clínica fechada aos finais de semana');

        expect(() => agendarConsulta(domingo)).toThrow('Clínica fechada aos finais de semana');
    });

    test('6. Formata moeda', () => {
        expect(formatarMoeda(100)).toBe('R$ 100,00');
        expect(formatarMoeda(15.5)).toBe('R$ 15,50');

        expect(() => formatarMoeda('abc')).toThrow('Valor inválido');
    });

    test('7. Valida CPF básico', () => {
        expect(validarCpfBasico('12345678901')).toBe(true);
        expect(validarCpfBasico('123.456.789-01')).toBe(true);
        expect(validarCpfBasico('11111111111')).toBe(false);
        expect(validarCpfBasico('12345')).toBe(false);
    });

    test('8. Calcula ingresso', () => {
        expect(calcularIngresso(25, false, 1)).toBe(40);
        expect(calcularIngresso(20, true, 1)).toBe(20);
        expect(calcularIngresso(65, false, 1)).toBe(20);
        expect(calcularIngresso(25, false, 3)).toBe(20);
        expect(calcularIngresso(65, true, 3)).toBe(20);
    });

    describe('9. Suíte da Classe ContaBancaria', () => {
        let conta;

        beforeEach(() => {
            conta = new ContaBancaria('Lucas');
        });

        test('Saldo inicial zero', () => {
            expect(conta.obterSaldo()).toBe(0);
        });

        test('Depósito válido', () => {
            conta.depositar(150);
            expect(conta.obterSaldo()).toBe(150);
        });

        test('Depósito negativo', () => {
            expect(() => conta.depositar(-50)).toThrow('Valor de depósito deve ser positivo');
        });

        test('Saque válido', () => {
            conta.depositar(200);
            conta.sacar(80);
            expect(conta.obterSaldo()).toBe(120);
        });

        test('Saque sem saldo suficiente', () => {
            conta.depositar(50);
            expect(() => conta.sacar(100)).toThrow('Saldo insuficiente');
        });
    });

    describe('10. Suíte de Clima Assíncrono com Mock', () => {
        test('Consulta de clima com sucesso', async () => {
            const servicoMock = {
                buscar: jest.fn().mockResolvedValue({ temperatura: 28 }),
            };

            const resultado = await obterClima('São Paulo', servicoMock);

            expect(resultado).toBe('A temperatura em São Paulo é de 28°C');

            expect(servicoMock.buscar).toHaveBeenCalledWith('São Paulo');

            expect(servicoMock.buscar).toHaveBeenCalledTimes(1);
        });

        test('Trata falha na consulta de clima', async () => {
            const servicoMockComFalha = {
                buscar: jest.fn().mockRejectedValue(new Error('Network Offline')),
            };

            await expect(obterClima('Curitiba', servicoMockComFalha)).rejects.toThrow(
                'Falha ao buscar dados climáticos',
            );
        });
    });
});
