// First Chart
let netMonthlySalary;
let cashleft;
const salaryInput = document.getElementById('Salary');
const costShelterBillsInput = document.getElementById('cost_sh_bills');
const costTravelInput = document.getElementById('cost_travel');
const costGroceriesInput = document.getElementById('cost_groceries');
const costOtherInput = document.getElementById('cost_other');
const cashFlowChartCanvas = document.getElementById('cashFlowChart');
const cashFlowChart = new Chart(cashFlowChartCanvas, { // Cashflow chart
  type: 'bar',
  data: {
    labels: ['Cash In', 'Cash Out', 'Cash Left'], 
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1
      },
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        type: 'linear', // Set the scale type to 'linear'
        beginAtZero: true,
      }
    }
  }
});

// 1st Chart

function updateCashFlowChart() {  // Logic to update cashflow chart with data

    const totalCosts =
      Number(costShelterBillsInput.value) +
      Number(costTravelInput.value) +
      Number(costGroceriesInput.value) +
      Number(costOtherInput.value);
    
    cashleft = netMonthlySalary - totalCosts
    cashFlowChart.data.datasets[0].data = [netMonthlySalary, totalCosts, cashleft];
    cashFlowChart.update();
    inOutRatio = (netMonthlySalary-totalCosts)/netMonthlySalary*100;

    document.getElementById('totalCosts').textContent = totalCosts.toFixed(2); // Update text with numbers
    document.getElementById('cashLeftDisplay1').textContent = cashleft.toFixed(2);
    document.getElementById('cashLeftDisplay2').textContent = cashleft.toFixed(2);
    document.getElementById('in-out-ratio').textContent = inOutRatio.toFixed(2);
  }

salaryInput.addEventListener('input', function () { // Update chart after salary value changes
    const salary = parseFloat(salaryInput.value);
    if (!isNaN(salary)) {
      netMonthlySalary = calculateNetSalary(salary);
      const salaryAmountDisplay = document.getElementById('salaryAmount'); // Update text with numbers
      salaryAmountDisplay.textContent = salary;
      const netMonthlySalaryDisplay = document.getElementById('netMonthlySalaryDisplay');
      netMonthlySalaryDisplay.textContent = netMonthlySalary.toFixed(2);
    }
  });
  
costShelterBillsInput.addEventListener('input', updateCashFlowChart); // Update chart after value changes
costTravelInput.addEventListener('input', updateCashFlowChart);
costGroceriesInput.addEventListener('input', updateCashFlowChart);
costOtherInput.addEventListener('input', updateCashFlowChart);

updateCashFlowChart();

// Third Chart
const amtSavingsInput = document.getElementById('amount_Savings');
const yieldSavingsInput = document.getElementById('yield_Savings');
const amtVanguardInput = document.getElementById('amt_Vanguard');
const yieldVanguardInput = document.getElementById('yield_Vanguard');
const moneyMapChartElement = document.getElementById('moneyMapChart');
var capitalDisplay = document.getElementById("capital_Display");
let amtSavings;
let yieldSavings;
let amtVanguard;
let yieldVanguard;


function updateMoneyMapChart() { // Logic to calculate and update the chart
  amtSavings = amtSavingsInput.value;
  yieldSavings = yieldSavingsInput.value;
  amtVanguard = amtVanguardInput.value;
  yieldVanguard = yieldVanguardInput.value;
  amtSavings *=12;
  amtVanguard *=12;
  const years = 5;
  let capital_amounts = calculateCapitalGrowth(amtSavings, yieldSavings, amtVanguard, yieldVanguard, years);
  capitalDisplay.textContent = capital_amounts[4].toString();
  moneyMapChart.data.datasets[0].data = capital_amounts;
  moneyMapChart.update();
}

amtSavingsInput.addEventListener('input', updateMoneyMapChart); // Update chart after value changes
yieldSavingsInput.addEventListener('input', updateMoneyMapChart);
amtVanguardInput.addEventListener('input', updateMoneyMapChart);
yieldVanguardInput.addEventListener('input', updateMoneyMapChart);

const moneyMapChart = new Chart(moneyMapChartElement, { // Moneymap chart
  type: 'bar',
  data: {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        type: 'linear', // Set the scale type to 'linear'
        beginAtZero: true
      }
    }
  }
});
