document.addEventListener('DOMContentLoaded', () => {
    
    // Core DOM Element input pointer hookups
    const loginForm = document.getElementById('fb-login-form');
    const inputContainers = document.querySelectorAll('.input-field-group-wrapper');
    const credentialInputs = loginForm.querySelectorAll('input');

    // 1. Setup Input field focus monitoring behaviors
    credentialInputs.forEach(input => {
        const parentWrapper = input.parentElement;

        // Clear the default preset blue highlight ring on focus alteration sequences
        input.addEventListener('focus', () => {
            // Remove hardcoded startup focus class if it exists anywhere else
            inputContainers.forEach(container => container.classList.remove('focused-blue-ring'));
            // Highlight active container frame wrapper
            parentWrapper.classList.add('focused-blue-ring');
        });

        // Strip highlight rings on input blur parameters change transitions
        input.addEventListener('blur', () => {
            parentWrapper.classList.remove('focused-blue-ring');
        });
    });

    // 2. Client Side Validation Lifecycle intercepts execution
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Halt default outbound navigation transmission stack
        
        let validationPassedFlag = true;
        
        credentialInputs.forEach(input => {
            const rawValue = input.value.trim();
            const parentWrapper = input.parentElement;

            if (!rawValue) {
                validationPassedFlag = false;
                // Visually emphasize missing components using error borders
                parentWrapper.style.borderColor = '#3a87f2'; 
                input.style.borderColor = '#ff1744';
            } else {
                input.style.borderColor = '';
            }
        });

        if (validationPassedFlag) {
            const parsedAccountUserToken = credentialInputs[0].value;
            alert(`Authentication Request Sim Payload packaged successfully for account: "${parsedAccountUserToken}"`);
            console.log("Transmission Matrix Credentials Pack:", {
                user: parsedAccountUserToken,
                passLength: credentialInputs[1].value.length
            });
        }
    });

    // 3. Attach auxiliary interactive notifications triggers
    document.getElementById('create-account-btn').addEventListener('click', () => {
        alert("Facebook Account Creation Protocol initialization wizard simulation triggered.");
    });

    const languageNodes = document.querySelectorAll('.lang-node:not(.view-more-languages)');
    languageNodes.forEach(node => {
        node.addEventListener('click', () => {
            languageNodes.forEach(n => n.classList.remove('dynamic-active'));
            node.classList.add('dynamic-active');
            console.log(`Application visual strings localization map changed to target node: ${node.textContent}`);
        });
    });
});