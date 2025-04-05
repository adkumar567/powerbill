document.addEventListener('DOMContentLoaded', function() {
    // Handle charge per unit options
    const chargeInputs = document.querySelectorAll('input[name="chargeOption"]');
    const chargeCustomInput = document.getElementById('charge');
    
    chargeInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value === 'custom') {
                chargeCustomInput.disabled = false;
                chargeCustomInput.focus();
            } else {
                chargeCustomInput.disabled = true;
                chargeCustomInput.value = '';
            }
        });
    });

    // Handle fixed cost options
    const fixedInputs = document.querySelectorAll('input[name="fixedOption"]');
    const fixedCustomInput = document.getElementById('fixed');
    
    fixedInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value === 'custom') {
                fixedCustomInput.disabled = false;
                fixedCustomInput.focus();
            } else {
                fixedCustomInput.disabled = true;
                fixedCustomInput.value = '';
            }
        });
    });

    // Handle form submission
    document.getElementById('billForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get units consumed
        const units = parseFloat(document.getElementById('units').value);
        
        // Get charge per unit
        let charge;
        const selectedChargeOption = document.querySelector('input[name="chargeOption"]:checked');
        if (selectedChargeOption.value === 'custom') {
            charge = parseFloat(chargeCustomInput.value);
        } else {
            charge = parseFloat(selectedChargeOption.value);
        }
        
        // Get fixed cost
        let fixed;
        const selectedFixedOption = document.querySelector('input[name="fixedOption"]:checked');
        if (selectedFixedOption.value === 'custom') {
            fixed = parseFloat(fixedCustomInput.value);
        } else {
            fixed = parseFloat(selectedFixedOption.value);
        }
        
        // Calculate base bill
        let totalBill = (units * charge) + fixed;
        
        // Apply surcharge if checkbox is checked
        if (document.getElementById('surcharge').checked) {
            totalBill *= 1.075; // 7.5% surcharge
        }
        
        // Display result
        document.getElementById('totalAmount').textContent = totalBill.toFixed(2);
    });

    // Handle reset button
    document.getElementById('resetButton').addEventListener('click', function() {
        // Reset units input
        document.getElementById('units').value = '';
        
        // Reset charge per unit
        document.getElementById('charge9').checked = true;
        document.getElementById('charge').disabled = true;
        document.getElementById('charge').value = '';
        
        // Reset fixed cost
        document.getElementById('fixed350').checked = true;
        document.getElementById('fixed').disabled = true;
        document.getElementById('fixed').value = '';
        
        // Reset surcharge checkbox
        document.getElementById('surcharge').checked = true;
        
        // Reset total amount display
        document.getElementById('totalAmount').textContent = '0.00';
    });
}); 