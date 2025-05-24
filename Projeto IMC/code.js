document.addEventListener('DOMContentLoaded', function() {
    const calcularBtn = document.getElementById('calcularBtn');
    const limparBtn = document.getElementById('limparBtn');
    const historicoBody = document.getElementById('historicoBody');
    const resultadoContainer = document.getElementById('resultadoContainer');
    
    let historico = [];
    
    calcularBtn.addEventListener('click', calcularIMC);
    limparBtn.addEventListener('click', limparCampos);
    
    function calcularIMC() {
        // Obter valores dos inputs
        const nome = document.getElementById('nome').value.trim();
        const sexo = document.querySelector('input[name="sexo"]:checked').value;
        const peso = parseFloat(document.getElementById('peso').value);
        const altura = parseFloat(document.getElementById('altura').value);
        
        // Validar entradas
        if (!nome || isNaN(peso) || isNaN(altura) || altura <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }
        
        // Calcular IMC
        const imc = peso / (altura * altura);
        
        // Determinar condição conforme sexo
        let condicao, diferencaKg;
        
        if (sexo === 'F') {
            if (imc < 19.1) {
                condicao = 'abaixo do peso';
                diferencaKg = (19.1 * (altura * altura) - peso;
            } else if (imc <= 25.8) {
                condicao = 'no peso normal';
                diferencaKg = 0;
            } else if (imc <= 27.3) {
                condicao = 'marginalmente acima do peso';
                diferencaKg = peso - (25.8 * (altura * altura));
            } else if (imc <= 32.3) {
                condicao = 'acima do peso ideal';
                diferencaKg = peso - (25.8 * (altura * altura));
            } else {
                condicao = 'obeso';
                diferencaKg = peso - (25.8 * (altura * altura));
            }
        } else { // Masculino
            if (imc < 20.7) {
                condicao = 'abaixo do peso';
                diferencaKg = (20.7 * (altura * altura) - peso);
            } else if (imc <= 26.4) {
                condicao = 'no peso normal';
                diferencaKg = 0;
            } else if (imc <= 27.8) {
                condicao = 'marginalmente acima do peso';
                diferencaKg = peso - (26.4 * (altura * altura));
            } else if (imc <= 31.1) {
                condicao = 'acima do peso ideal';
                diferencaKg = peso - (26.4 * (altura * altura));
            } else {
                condicao = 'obeso';
                diferencaKg = peso - (26.4 * (altura * altura));
            }
        }
        
        // Formatar mensagem de resultado
        let mensagem = `<p><strong>${nome}</strong></p>`;
        mensagem += `<p>Sexo: ${sexo === 'F' ? 'Feminino' : 'Masculino'}</p>`;
        mensagem += `<p>Peso: ${peso.toFixed(1)} kg</p>`;
        mensagem += `<p>Altura: ${altura.toFixed(2)} m</p>`;
        mensagem += `<p>IMC: ${imc.toFixed(1)}</p>`;
        mensagem += `<p>Condição: ${condicao}</p>`;
        
        if (diferencaKg !== 0) {
            const acao = diferencaKg > 0 ? 'ganhar' : 'perder';
            mensagem += `<p>Você precisa ${acao} ${Math.abs(diferencaKg).toFixed(1)} kg para atingir o peso normal</p>`;
        } else {
            mensagem += `<p>Você está no peso ideal!</p>`;
        }
        
        resultadoContainer.innerHTML = mensagem;
        
        // Adicionar ao histórico
        const registro = {
            nome,
            sexo,
            peso,
            altura,
            imc,
            condicao,
            diferencaKg
        };
        
        historico.push(registro);
        atualizarHistorico();
    }
    
    function atualizarHistorico() {
        historicoBody.innerHTML = '';
        
        historico.forEach(registro => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${registro.nome}</td>
                <td>${registro.sexo === 'F' ? 'Feminino' : 'Masculino'}</td>
                <td>${registro.peso.toFixed(1)}</td>
                <td>${registro.altura.toFixed(2)}</td>
                <td>${registro.imc.toFixed(1)}</td>
                <td>${registro.condicao}</td>
                <td>${registro.diferencaKg !== 0 ? registro.diferencaKg.toFixed(1) : '-'}</td>
            `;
            
            historicoBody.appendChild(row);
        });
    }
    
    function limparCampos() {
        document.getElementById('nome').value = '';
        document.getElementById('feminino').checked = true;
        document.getElementById('peso').value = '';
        document.getElementById('altura').value = '';
        resultadoContainer.innerHTML = '<p>Preencha os dados e clique em "Calcular IMC"</p>';
    }
});