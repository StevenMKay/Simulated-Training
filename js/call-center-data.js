// Mock customer data and scenarios
const customerDatabase = [
    {
        id: 'C001',
        name: 'Sarah Johnson',
        accountNumber: '****4567',
        fullAccountNumber: '12345674567',
        phone: '(555) 123-4567',
        email: 'sarah.johnson@email.com',
        dob: '1985-03-15',
        ssn: '1234',
        maidenName: 'Williams',
        address: '123 Oak Street, Springfield, IL 62701',
        checkingBalance: 2850.75,
        savingsBalance: 15600.20,
        creditLimit: 5000,
        creditAvailable: 3200,
        joinDate: '2018-05-12',
        requestType: 'Wire Transfer',
        priority: 'high',
        scenario: 'urgent_wire',
        personality: 'anxious',
        securityAlerts: ['Recent login from new device', 'Address change requested last month'],
        transactionHistory: [
            { date: '2024-08-14', type: 'Debit', amount: -125.00, description: 'Grocery Store' },
            { date: '2024-08-13', type: 'Credit', amount: 2500.00, description: 'Payroll Deposit' },
            { date: '2024-08-12', type: 'Debit', amount: -65.50, description: 'Gas Station' }
        ]
    },
    {
        id: 'C002',
        name: 'Michael Chen',
        accountNumber: '****8901',
        fullAccountNumber: '98765438901',
        phone: '(555) 987-6543',
        email: 'm.chen@techcorp.com',
        dob: '1990-11-22',
        ssn: '5678',
        maidenName: 'Liu',
        address: '456 Pine Avenue, Austin, TX 78701',
        checkingBalance: 4250.30,
        savingsBalance: 25890.75,
        creditLimit: 10000,
        creditAvailable: 8500,
        joinDate: '2020-01-08',
        requestType: 'Account Update',
        priority: 'medium',
        scenario: 'address_change',
        personality: 'professional',
        securityAlerts: ['High-value transactions enabled'],
        transactionHistory: [
            { date: '2024-08-14', type: 'Debit', amount: -1200.00, description: 'Rent Payment' },
            { date: '2024-08-13', type: 'Credit', amount: 5500.00, description: 'Salary Deposit' },
            { date: '2024-08-11', type: 'Debit', amount: -89.99, description: 'Online Purchase' }
        ]
    },
    {
        id: 'C003',
        name: 'Emily Rodriguez',
        accountNumber: '****2345',
        fullAccountNumber: '55566672345',
        phone: '(555) 456-7890',
        email: 'emily.r@gmail.com',
        dob: '1982-07-08',
        ssn: '9012',
        maidenName: 'Garcia',
        address: '789 Maple Drive, Denver, CO 80202',
        checkingBalance: 875.60,
        savingsBalance: 3240.80,
        creditLimit: 3000,
        creditAvailable: 2100,
        joinDate: '2019-09-15',
        requestType: 'Card Activation',
        priority: 'low',
        scenario: 'new_card',
        personality: 'friendly',
        securityAlerts: ['New debit card issued'],
        transactionHistory: [
            { date: '2024-08-14', type: 'Debit', amount: -45.25, description: 'Restaurant' },
            { date: '2024-08-13', type: 'Debit', amount: -120.00, description: 'Utilities' },
            { date: '2024-08-12', type: 'Credit', amount: 1800.00, description: 'Freelance Payment' }
        ]
    },
    {
        id: 'C004',
        name: 'Robert Thompson',
        accountNumber: '****6789',
        fullAccountNumber: '44455566789',
        phone: '(555) 234-5678',
        email: 'rthompson@law.com',
        dob: '1975-12-03',
        ssn: '3456',
        maidenName: 'Thompson',
        address: '321 Cedar Lane, Miami, FL 33101',
        checkingBalance: 12500.45,
        savingsBalance: 67890.25,
        creditLimit: 25000,
        creditAvailable: 22000,
        joinDate: '2015-03-22',
        requestType: 'Loan Application',
        priority: 'high',
        scenario: 'mortgage_inquiry',
        personality: 'impatient',
        securityAlerts: ['VIP customer - priority service'],
        transactionHistory: [
            { date: '2024-08-14', type: 'Credit', amount: 15000.00, description: 'Investment Maturity' },
            { date: '2024-08-12', type: 'Debit', amount: -2500.00, description: 'Mortgage Payment' },
            { date: '2024-08-10', type: 'Debit', amount: -450.00, description: 'Insurance Premium' }
        ]
    },
    {
        id: 'C005',
        name: 'Lisa Martinez',
        accountNumber: '****9876',
        fullAccountNumber: '77788889876',
        phone: '(555) 345-6789',
        email: 'lisa.martinez@hospital.org',
        dob: '1988-04-18',
        ssn: '7890',
        maidenName: 'Lopez',
        address: '654 Birch Street, Seattle, WA 98101',
        checkingBalance: 3650.90,
        savingsBalance: 18750.35,
        creditLimit: 7500,
        creditAvailable: 6200,
        joinDate: '2017-11-30',
        requestType: 'Fraud Report',
        priority: 'high',
        scenario: 'suspicious_activity',
        personality: 'worried',
        securityAlerts: ['Suspicious transactions detected', 'Card temporarily blocked'],
        transactionHistory: [
            { date: '2024-08-14', type: 'Debit', amount: -299.99, description: 'UNKNOWN MERCHANT - FLAGGED' },
            { date: '2024-08-14', type: 'Debit', amount: -199.99, description: 'UNKNOWN MERCHANT - FLAGGED' },
            { date: '2024-08-13', type: 'Credit', amount: 4200.00, description: 'Payroll Deposit' }
        ]
    },
    {
        id: 'C006',
        name: 'James Wilson',
        accountNumber: '****5432',
        fullAccountNumber: '33344445432',
        phone: '(555) 567-8901',
        email: 'jwilson@startup.co',
        dob: '1993-09-25',
        ssn: '2468',
        maidenName: 'Davis',
        address: '987 Elm Court, Portland, OR 97201',
        checkingBalance: 750.25,
        savingsBalance: 1200.00,
        creditLimit: 2500,
        creditAvailable: 500,
        joinDate: '2022-06-14',
        requestType: 'Credit Increase',
        priority: 'medium',
        scenario: 'credit_request',
        personality: 'hopeful',
        securityAlerts: ['Recent graduate - building credit history'],
        transactionHistory: [
            { date: '2024-08-14', type: 'Debit', amount: -25.00, description: 'Overdraft Fee' },
            { date: '2024-08-13', type: 'Debit', amount: -800.00, description: 'Rent Payment' },
            { date: '2024-08-12', type: 'Credit', amount: 1250.00, description: 'Part-time Job' }
        ]
    }
];

// Conversation scenarios and responses
const conversationScenarios = {
    urgent_wire: {
        customerMessages: [
            "Hi, I need to send an urgent wire transfer to my daughter who's studying abroad. She needs the money today for her tuition payment.",
            "The amount is $5,000 and it's going to a bank in London. Her account details are... wait, let me find them.",
            "I'm really worried because the deadline is today. Can you help me process this quickly?",
            "Do I have enough in my checking account? I think I do but I want to make sure.",
            "How long will it take to go through? And what are the fees?"
        ],
        triggers: ['wire', 'transfer', 'urgent', 'international', 'fees', 'time'],
        responses: {
            greeting: "Thank you for calling SecureBank. I understand you need to send an urgent wire transfer. I'll be happy to help you with that.",
            verification: "For security purposes, I need to verify your identity before we can process the wire transfer.",
            amount_check: "I can see you have $2,850.75 in your checking account, which is sufficient for a $5,000 transfer if we use funds from your savings as well.",
            fees_info: "International wire transfers have a $45 fee, and typically take 1-2 business days to complete.",
            next_steps: "Once I verify your identity, I'll need the recipient's bank details and we can process this transfer immediately."
        }
    },
    address_change: {
        customerMessages: [
            "Hello, I recently moved and need to update my address on my account.",
            "I moved from Austin to Dallas for a new job. I want to make sure all my mail gets forwarded properly.",
            "Do I need to provide any documentation for the address change?",
            "Also, I'll be getting a new phone number soon. Can I update that at the same time?",
            "Will this affect my direct deposit or any automatic payments?"
        ],
        triggers: ['address', 'moved', 'update', 'phone', 'direct deposit'],
        responses: {
            greeting: "Thank you for calling SecureBank. I'll be happy to help you update your address and contact information.",
            verification: "Let me first verify your identity, then I can update your account information.",
            documentation: "For address changes, I can update it now over the phone, but you'll need to mail us a utility bill or lease agreement within 30 days.",
            phone_update: "Yes, I can update your phone number at the same time. What's your new number?",
            direct_deposit: "Your direct deposit and automatic payments won't be affected by the address change, but it's good that you're updating this information."
        }
    },
    suspicious_activity: {
        customerMessages: [
            "Hi, I'm calling because I see some charges on my account that I didn't make. I'm really worried someone has my card information.",
            "There are two charges today - one for $299.99 and another for $199.99. I have no idea what they're for.",
            "I still have my card with me, so I don't know how this happened. What should I do?",
            "Can you stop my card right now? I don't want any more unauthorized charges.",
            "Will I get my money back? This is really stressing me out."
        ],
        triggers: ['fraud', 'unauthorized', 'charges', 'stolen', 'block card'],
        responses: {
            greeting: "Thank you for calling SecureBank. I understand you're concerned about unauthorized charges on your account. Let me help you resolve this immediately.",
            verification: "First, let me verify your identity, then I'll review the suspicious transactions you mentioned.",
            card_block: "I'm going to block your card right now to prevent any additional unauthorized charges.",
            dispute_process: "I'm initiating a dispute for these charges. You'll receive temporary credit within 1-2 business days while we investigate.",
            new_card: "I'm also ordering you a new debit card which should arrive in 3-5 business days. Would you like expedited shipping?"
        }
    },
    new_card: {
        customerMessages: [
            "Hi, I received my new debit card in the mail and need to activate it.",
            "This is replacing my old card that was expiring. Do I need to do anything special?",
            "Can I use it right away once it's activated?",
            "What about my automatic payments? Will they still work with the new card?",
            "Also, I want to set up a new PIN. Can we do that now?"
        ],
        triggers: ['activate', 'new card', 'PIN', 'automatic payments'],
        responses: {
            greeting: "Thank you for calling SecureBank. I'll be happy to help you activate your new debit card.",
            verification: "Let me verify your identity first, then we can activate your card.",
            activation: "Perfect! I've activated your new card. You can use it immediately.",
            automatic_payments: "Your automatic payments will continue to work, but you should update merchants with your new card number and expiration date.",
            pin_setup: "I can help you set up a new PIN. You'll need to call our automated PIN system or visit an ATM to create it."
        }
    }
};

// Quick response templates
const quickResponses = {
    greeting: "Thank you for calling SecureBank. How can I assist you today?",
    verification: "For security purposes, I need to verify your identity first.",
    empathy: "I understand your concern, and I'm here to help you resolve this.",
    hold: "Thank you for your patience. Let me look into that for you.",
    confirmation: "I have successfully processed your request.",
    security: "This transaction requires additional security verification.",
    transfer_complete: "Your transfer has been processed successfully.",
    card_blocked: "I have blocked your card to prevent any unauthorized use.",
    documentation: "I'll need you to provide documentation for this request.",
    escalation: "Let me connect you with a supervisor for additional assistance.",
    closing: "Is there anything else I can help you with today?"
};

// Transaction types and their requirements
const transactionTypes = {
    wire_transfer: {
        name: 'Wire Transfer',
        requirements: ['identity_verification', 'recipient_info', 'amount_confirmation'],
        fees: { domestic: 25, international: 45 },
        processing_time: '1-2 business days',
        daily_limit: 10000
    },
    internal_transfer: {
        name: 'Internal Transfer',
        requirements: ['identity_verification', 'account_selection', 'amount_confirmation'],
        fees: { standard: 0 },
        processing_time: 'Immediate',
        daily_limit: 50000
    },
    bill_payment: {
        name: 'Bill Payment',
        requirements: ['identity_verification', 'payee_info', 'amount_confirmation'],
        fees: { standard: 0, expedited: 15 },
        processing_time: '1-3 business days',
        daily_limit: 25000
    },
    card_activation: {
        name: 'Card Activation',
        requirements: ['identity_verification', 'card_verification'],
        fees: { standard: 0 },
        processing_time: 'Immediate',
        daily_limit: null
    },
    account_update: {
        name: 'Account Update',
        requirements: ['identity_verification', 'documentation'],
        fees: { standard: 0 },
        processing_time: 'Immediate',
        daily_limit: null
    },
    fraud_report: {
        name: 'Fraud Report',
        requirements: ['identity_verification', 'transaction_review', 'card_replacement'],
        fees: { standard: 0, expedited_card: 25 },
        processing_time: 'Immediate block, 3-5 days for new card',
        daily_limit: null
    }
};

// Performance tracking
let performanceMetrics = {
    callsHandled: 0,
    totalResponseTime: 0,
    averageResponseTime: 0,
    customerSatisfaction: 0,
    casesResolved: 0,
    startTime: new Date().getTime()
};

// Generate random customers for queue
function generateRandomCustomer() {
    const names = ['Alex Johnson', 'Maria Garcia', 'David Kim', 'Jennifer Lee', 'Christopher Brown', 'Amanda Davis', 'Marcus Wilson', 'Rebecca Taylor'];
    const requestTypes = ['Account Balance', 'Payment Issue', 'Card Problem', 'Loan Inquiry', 'Investment Question', 'Technical Support'];
    const priorities = ['low', 'medium', 'high'];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomRequest = requestTypes[Math.floor(Math.random() * requestTypes.length)];
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
    
    return {
        id: 'R' + Math.random().toString(36).substr(2, 9),
        name: randomName,
        requestType: randomRequest,
        priority: randomPriority,
        waitTime: Math.floor(Math.random() * 15) + 1 + ' min'
    };
}

// Export data for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        customerDatabase,
        conversationScenarios,
        quickResponses,
        transactionTypes,
        performanceMetrics,
        generateRandomCustomer
    };
}
