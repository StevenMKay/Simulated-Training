// Call Center Application Logic
class CallCenterApp {
    constructor() {
        this.currentCustomer = null;
        this.isVerified = false;
        this.chatHistory = [];
        this.responseTime = 0;
        this.caseStartTime = null;
        this.autoResponseEnabled = true;
        this.customerQueue = [];
        this.holdQueue = [];
        
        this.init();
    }

    init() {
        this.loadCustomerQueue();
        this.setupEventListeners();
        this.startPerformanceTracking();
        this.simulateIncomingCalls();
    }

    setupEventListeners() {
        // Message input handling
        const messageInput = document.getElementById('messageInput');
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-save drafts
        messageInput.addEventListener('input', () => {
            this.saveDraft();
        });
    }

    loadCustomerQueue() {
        // Load initial customers
        this.customerQueue = [...customerDatabase];
        
        // Add some random customers
        for (let i = 0; i < 3; i++) {
            this.customerQueue.push(generateRandomCustomer());
        }

        // Generate hold queue
        for (let i = 0; i < 2; i++) {
            this.holdQueue.push(generateRandomCustomer());
        }

        this.renderCustomerQueue();
        this.renderHoldQueue();
    }

    renderCustomerQueue() {
        const queueContainer = document.getElementById('customerQueue');
        queueContainer.innerHTML = '';

        this.customerQueue.forEach(customer => {
            const customerCard = this.createCustomerCard(customer);
            queueContainer.appendChild(customerCard);
        });
    }

    renderHoldQueue() {
        const holdContainer = document.getElementById('holdQueue');
        holdContainer.innerHTML = '';

        this.holdQueue.forEach(customer => {
            const customerCard = this.createCustomerCard(customer, true);
            holdContainer.appendChild(customerCard);
        });
    }

    createCustomerCard(customer, isOnHold = false) {
        const card = document.createElement('div');
        card.className = `customer-card ${this.currentCustomer?.id === customer.id ? 'active' : ''}`;
        card.onclick = () => this.selectCustomer(customer);
        
        card.innerHTML = `
            <div class="customer-name">${customer.name}</div>
            <div class="request-type">${customer.requestType}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                <span class="priority ${customer.priority}">${customer.priority.toUpperCase()}</span>
                ${isOnHold ? '<span style="font-size: 11px; color: #e74c3c;"><i class="fas fa-clock"></i> On Hold</span>' : 
                           '<span style="font-size: 11px; color: #7f8c8d;">' + (customer.waitTime || '< 1 min') + '</span>'}
            </div>
        `;

        return card;
    }

    selectCustomer(customer) {
        if (this.currentCustomer?.id === customer.id) return;

        this.currentCustomer = customer;
        this.isVerified = false;
        this.chatHistory = [];
        this.caseStartTime = new Date().getTime();
        
        // Update UI
        this.renderCustomerQueue();
        this.renderHoldQueue();
        this.updateChatHeader();
        this.loadCustomerProfile();
        this.initializeChat();
        this.enableInputs();
        
        // Start conversation simulation
        setTimeout(() => this.simulateCustomerMessage(), 2000);
    }

    updateChatHeader() {
        if (!this.currentCustomer) return;

        document.getElementById('currentCustomerName').textContent = this.currentCustomer.name;
        document.getElementById('currentAccountNumber').textContent = 
            `Account: ${this.currentCustomer.accountNumber || this.currentCustomer.id}`;
        
        const verificationStatus = document.getElementById('verificationStatus');
        if (this.isVerified) {
            verificationStatus.className = 'verification-status verified';
            verificationStatus.innerHTML = '<i class="fas fa-shield-alt"></i> Verified';
        } else {
            verificationStatus.className = 'verification-status pending';
            verificationStatus.innerHTML = '<i class="fas fa-shield-alt"></i> Verification Required';
        }
    }

    loadCustomerProfile() {
        if (!this.currentCustomer) return;

        const profileContainer = document.getElementById('customerProfile');
        const customer = this.currentCustomer;

        if (customer.dob) {
            // Full customer from database
            profileContainer.innerHTML = `
                <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="margin-bottom: 10px;"><strong>Phone:</strong> ${customer.phone}</div>
                    <div style="margin-bottom: 10px;"><strong>Email:</strong> ${customer.email}</div>
                    <div style="margin-bottom: 10px;"><strong>Address:</strong> ${customer.address}</div>
                    <div style="margin-bottom: 10px;"><strong>Member Since:</strong> ${customer.joinDate}</div>
                    <div><strong>Account Type:</strong> Premium Banking</div>
                </div>
            `;

            // Update account balances
            document.getElementById('checkingBalance').textContent = `$${customer.checkingBalance.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
            document.getElementById('savingsBalance').textContent = `$${customer.savingsBalance.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
            document.getElementById('creditAvailable').textContent = `$${customer.creditAvailable.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

            // Load security alerts
            this.loadSecurityAlerts(customer.securityAlerts);
        } else {
            // Random customer
            profileContainer.innerHTML = `
                <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="margin-bottom: 10px;"><strong>Customer ID:</strong> ${customer.id}</div>
                    <div style="margin-bottom: 10px;"><strong>Request:</strong> ${customer.requestType}</div>
                    <div><strong>Priority:</strong> <span class="priority ${customer.priority}">${customer.priority.toUpperCase()}</span></div>
                </div>
            `;

            // Set default balances
            document.getElementById('checkingBalance').textContent = '$2,450.75';
            document.getElementById('savingsBalance').textContent = '$8,920.50';
            document.getElementById('creditAvailable').textContent = '$3,500.00';

            this.loadSecurityAlerts(['Standard security profile']);
        }
    }

    loadSecurityAlerts(alerts) {
        const alertsContainer = document.getElementById('securityAlerts');
        alertsContainer.innerHTML = '';

        alerts.forEach(alert => {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert-item';
            alertDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${alert}`;
            alertsContainer.appendChild(alertDiv);
        });
    }

    initializeChat() {
        const chatContainer = document.getElementById('chatContainer');
        chatContainer.innerHTML = `
            <div class="message agent">
                <div class="message-content">
                    <div>Welcome to SecureBank! I can see you're calling about ${this.currentCustomer.requestType}. How can I assist you today?</div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                </div>
            </div>
        `;
        this.scrollToBottom();
    }

    simulateCustomerMessage() {
        if (!this.currentCustomer || !this.autoResponseEnabled) return;

        const scenario = conversationScenarios[this.currentCustomer.scenario];
        if (scenario && scenario.customerMessages.length > 0) {
            this.showTypingIndicator();
            
            setTimeout(() => {
                this.hideTypingIndicator();
                const randomMessage = scenario.customerMessages[Math.floor(Math.random() * scenario.customerMessages.length)];
                this.addMessage(randomMessage, 'customer');
            }, 2000 + Math.random() * 3000);
        }
    }

    showTypingIndicator() {
        document.getElementById('typingIndicator').style.display = 'flex';
    }

    hideTypingIndicator() {
        document.getElementById('typingIndicator').style.display = 'none';
    }

    sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();
        
        if (!message) return;

        this.addMessage(message, 'agent');
        input.value = '';
        
        // Track response time
        if (this.responseTime === 0) {
            this.responseTime = new Date().getTime() - this.caseStartTime;
        }

        // Simulate customer response
        setTimeout(() => {
            this.generateCustomerResponse(message);
        }, 3000 + Math.random() * 5000);
    }

    addMessage(content, sender) {
        const chatContainer = document.getElementById('chatContainer');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <div>${content}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;

        chatContainer.appendChild(messageDiv);
        this.scrollToBottom();

        this.chatHistory.push({
            content,
            sender,
            timestamp: new Date()
        });
    }

    generateCustomerResponse(agentMessage) {
        if (!this.currentCustomer) return;

        const scenario = conversationScenarios[this.currentCustomer.scenario];
        if (!scenario) {
            this.addGenericResponse();
            return;
        }

        // Find appropriate response based on agent message
        let response = '';
        const lowerMessage = agentMessage.toLowerCase();

        if (lowerMessage.includes('verify') || lowerMessage.includes('identity')) {
            response = "Sure, I can provide my information for verification. What do you need?";
        } else if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
            const randomMsg = scenario.customerMessages[Math.floor(Math.random() * scenario.customerMessages.length)];
            response = randomMsg;
        } else if (lowerMessage.includes('thank')) {
            response = "Thank you so much for your help! This really means a lot to me.";
        } else {
            // Use scenario-specific responses
            const responseKeys = Object.keys(scenario.responses);
            const randomKey = responseKeys[Math.floor(Math.random() * responseKeys.length)];
            response = scenario.responses[randomKey] || "I understand. What's the next step?";
        }

        this.showTypingIndicator();
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(response, 'customer');
        }, 2000);
    }

    addGenericResponse() {
        const responses = [
            "I understand. Can you help me with that?",
            "That sounds good. What do I need to do next?",
            "Thank you for explaining that to me.",
            "I appreciate your help with this.",
            "Is there anything else I need to know?"
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        this.addMessage(response, 'customer');
    }

    enableInputs() {
        document.getElementById('messageInput').disabled = false;
        document.querySelector('.send-btn').disabled = false;
        document.getElementById('messageInput').placeholder = "Type your response to the customer...";
    }

    scrollToBottom() {
        const chatContainer = document.getElementById('chatContainer');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    }

    // Modal functions
    openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    verifyCustomer() {
        if (!this.currentCustomer) return;

        const dobInput = document.getElementById('dobInput').value;
        const ssnInput = document.getElementById('ssnInput').value;
        const maidenInput = document.getElementById('maidenInput').value;

        // Simulate verification (in real app, this would be secure backend verification)
        const customer = this.currentCustomer;
        let isValid = true;

        if (customer.dob && dobInput !== customer.dob) {
            alert('Date of birth does not match our records.');
            return;
        }

        if (customer.ssn && ssnInput !== customer.ssn) {
            alert('SSN does not match our records.');
            return;
        }

        if (customer.maidenName && maidenInput.toLowerCase() !== customer.maidenName.toLowerCase()) {
            alert("Mother's maiden name does not match our records.");
            return;
        }

        // Verification successful
        this.isVerified = true;
        this.updateChatHeader();
        this.closeModal('verifyModal');
        
        // Clear form
        document.getElementById('dobInput').value = '';
        document.getElementById('ssnInput').value = '';
        document.getElementById('maidenInput').value = '';

        this.addMessage("Identity verification completed successfully. How can I help you today?", 'agent');
        
        setTimeout(() => {
            this.addMessage("Great! Now that you've verified my identity, I feel much more comfortable proceeding.", 'customer');
        }, 2000);
    }

    processTransfer() {
        if (!this.isVerified) {
            alert('Customer identity must be verified before processing transfers.');
            return;
        }

        const fromAccount = document.getElementById('fromAccount').value;
        const toAccount = document.getElementById('toAccount').value;
        const amount = parseFloat(document.getElementById('transferAmount').value);
        const transferType = document.getElementById('transferType').value;

        if (!toAccount || !amount || amount <= 0) {
            alert('Please fill in all required fields with valid information.');
            return;
        }

        // Simulate processing
        this.closeModal('transferModal');
        this.addMessage(`I'm processing your ${transferType.toLowerCase()} of $${amount.toFixed(2)} from ${fromAccount} to ${toAccount}. This may take a moment.`, 'agent');
        
        setTimeout(() => {
            this.addMessage(`Transfer completed successfully! Reference number: TXN${Date.now()}`, 'agent');
            setTimeout(() => {
                this.addMessage("Perfect! I can see the confirmation. Thank you so much for your help!", 'customer');
            }, 2000);
        }, 3000);

        // Clear form
        document.getElementById('toAccount').value = '';
        document.getElementById('transferAmount').value = '';
    }

    processCardService() {
        if (!this.isVerified) {
            alert('Customer identity must be verified before processing card services.');
            return;
        }

        const service = document.getElementById('cardService').value;
        const cardDigits = document.getElementById('cardDigits').value;

        if (!cardDigits || cardDigits.length !== 4) {
            alert('Please provide the last 4 digits of the card.');
            return;
        }

        this.closeModal('cardModal');
        this.addMessage(`I'm processing your ${service.toLowerCase()} request for the card ending in ${cardDigits}.`, 'agent');
        
        setTimeout(() => {
            let message = '';
            switch (service) {
                case 'Activate New Card':
                    message = 'Your new card has been activated successfully and is ready to use.';
                    break;
                case 'Report Lost/Stolen':
                    message = 'Your card has been blocked for security. A replacement card will be mailed within 3-5 business days.';
                    break;
                case 'Request Replacement':
                    message = 'A replacement card has been ordered and will arrive within 3-5 business days.';
                    break;
                case 'Update PIN':
                    message = 'Please visit any ATM to set your new PIN using your card and current PIN.';
                    break;
                case 'Increase Credit Limit':
                    message = 'I\'ve submitted your credit limit increase request. You\'ll receive a decision within 7-10 business days.';
                    break;
            }
            this.addMessage(message, 'agent');
            
            setTimeout(() => {
                this.addMessage("That's exactly what I needed! Thank you for taking care of this so quickly.", 'customer');
            }, 2000);
        }, 2500);

        // Clear form
        document.getElementById('cardDigits').value = '';
    }

    updateAccount() {
        if (!this.isVerified) {
            alert('Customer identity must be verified before updating account information.');
            return;
        }

        const updateType = document.getElementById('updateType').value;
        const newInfo = document.getElementById('newInfo').value;

        if (!newInfo.trim()) {
            alert('Please provide the new information.');
            return;
        }

        this.closeModal('accountModal');
        this.addMessage(`I'm updating your ${updateType.toLowerCase()} to: ${newInfo}`, 'agent');
        
        setTimeout(() => {
            this.addMessage(`Your ${updateType.toLowerCase()} has been updated successfully in our system.`, 'agent');
            setTimeout(() => {
                this.addMessage("Perfect! I really appreciate how easy you made this process.", 'customer');
            }, 2000);
        }, 2500);

        // Clear form
        document.getElementById('newInfo').value = '';
    }

    resolveCase() {
        if (!this.currentCustomer) return;

        if (!this.isVerified) {
            alert('Customer identity must be verified before resolving the case.');
            return;
        }

        // Calculate case resolution metrics
        const caseTime = new Date().getTime() - this.caseStartTime;
        const caseMinutes = Math.floor(caseTime / 60000);

        this.addMessage("Is there anything else I can help you with today?", 'agent');
        
        setTimeout(() => {
            this.addMessage("No, that covers everything I needed. Thank you so much for your excellent service!", 'customer');
            
            setTimeout(() => {
                this.addMessage("Thank you for choosing SecureBank. Have a wonderful day!", 'agent');
                
                // Update performance metrics
                performanceMetrics.callsHandled++;
                performanceMetrics.casesResolved++;
                performanceMetrics.totalResponseTime += this.responseTime;
                performanceMetrics.averageResponseTime = performanceMetrics.totalResponseTime / performanceMetrics.callsHandled;
                
                this.updatePerformanceDisplay();
                
                // Remove customer from queue
                this.customerQueue = this.customerQueue.filter(c => c.id !== this.currentCustomer.id);
                this.renderCustomerQueue();
                
                // Reset for next customer
                setTimeout(() => {
                    this.resetForNextCustomer();
                }, 3000);
                
            }, 2000);
        }, 2000);
    }

    resetForNextCustomer() {
        this.currentCustomer = null;
        this.isVerified = false;
        this.chatHistory = [];
        this.responseTime = 0;
        
        // Reset UI
        document.getElementById('currentCustomerName').textContent = 'Select a customer to begin';
        document.getElementById('currentAccountNumber').textContent = '';
        document.getElementById('verificationStatus').className = 'verification-status pending';
        document.getElementById('verificationStatus').innerHTML = '<i class="fas fa-shield-alt"></i> Verification Required';
        
        // Reset chat
        const chatContainer = document.getElementById('chatContainer');
        chatContainer.innerHTML = `
            <div style="text-align: center; color: #7f8c8d; margin-top: 100px;">
                <i class="fas fa-comments" style="font-size: 48px; margin-bottom: 20px;"></i>
                <h3>Ready for Next Customer</h3>
                <p>Select a customer from the queue to continue</p>
            </div>
        `;
        
        // Disable inputs
        document.getElementById('messageInput').disabled = true;
        document.querySelector('.send-btn').disabled = true;
        document.getElementById('messageInput').placeholder = "Select a customer to begin...";
        document.getElementById('messageInput').value = '';

        // Reset customer profile
        document.getElementById('customerProfile').innerHTML = `
            <p style="color: #7f8c8d; text-align: center; margin-top: 50px;">
                Select a customer to view their profile
            </p>
        `;

        // Reset account balances
        document.getElementById('checkingBalance').textContent = '-';
        document.getElementById('savingsBalance').textContent = '-';
        document.getElementById('creditAvailable').textContent = '-';

        // Clear security alerts
        document.getElementById('securityAlerts').innerHTML = '';
    }

    simulateIncomingCalls() {
        // Add new customers to queue periodically
        setInterval(() => {
            if (Math.random() < 0.3 && this.customerQueue.length < 8) {
                const newCustomer = generateRandomCustomer();
                this.customerQueue.push(newCustomer);
                this.renderCustomerQueue();
            }
        }, 30000); // Every 30 seconds
    }

    startPerformanceTracking() {
        // Update clock every second
        setInterval(() => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
            });
            document.querySelector('.agent-info span:last-child').innerHTML = `<i class="fas fa-clock"></i> ${timeString}`;
        }, 1000);

        this.updatePerformanceDisplay();
    }

    updatePerformanceDisplay() {
        document.getElementById('callsHandled').textContent = performanceMetrics.callsHandled;
        
        const avgMinutes = Math.floor(performanceMetrics.averageResponseTime / 60000);
        const avgSeconds = Math.floor((performanceMetrics.averageResponseTime % 60000) / 1000);
        document.getElementById('avgResponseTime').textContent = `${avgMinutes}:${avgSeconds.toString().padStart(2, '0')}`;
    }

    saveDraft() {
        // Auto-save functionality (could save to localStorage)
        const draft = document.getElementById('messageInput').value;
        localStorage.setItem('messageDraft', draft);
    }
}

// Quick response function
function addQuickResponse(message) {
    document.getElementById('messageInput').value = message;
    document.getElementById('messageInput').focus();
}

// Global functions for modal handling
function openModal(modalId) {
    app.openModal(modalId);
}

function closeModal(modalId) {
    app.closeModal(modalId);
}

function verifyCustomer() {
    app.verifyCustomer();
}

function processTransfer() {
    app.processTransfer();
}

function processCardService() {
    app.processCardService();
}

function updateAccount() {
    app.updateAccount();
}

function resolveCase() {
    app.resolveCase();
}

function sendMessage() {
    app.sendMessage();
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new CallCenterApp();
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});
