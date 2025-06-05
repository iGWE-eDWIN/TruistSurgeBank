const API_URL = 'https://api.truistsurgebank.org';

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data.user;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const transferFunds = async (
  receiverAccountNumber,
  amount,
  description,
  transferPin
) => {
  try {
    const token = localStorage.getItem('token');

    // Convert amount to number before sending
    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      throw new Error('Please enter a valid positive amount');
    }

    const response = await fetch(`${API_URL}/user/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        receiverAccountNumber,
        amount: numericAmount,
        description,
        transferPin,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    return data;
  } catch (error) {
    console.error('Error transferring funds:', error);
    throw error;
  }
};

export const getUserTransactions = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/user/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data.transactions;
  } catch (error) {
    console.error('Error getting user transactions:', error);
    throw error;
  }
};

export const getRecentTransactions = async (limit = 5) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${API_URL}/user/transactions/recent?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Unknow error');
    return data.transactions;
  } catch (error) {
    console.error('Error getting recent transactions:', error);
    throw error;
  }
};

export const applyForLoan = async (type, amount) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/user/loans/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type, amount }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Error applying for loan:', error);
    throw error;
  }
};

export const getUserLoans = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/user/loans`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Error getting user loans:', error);
    throw error;
  }
};

export const attemptWithdrawal = async (amount) => {
  console.log(amount);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(
        new Error(
          'Withdrawal failed. Please contact customer care for assistance.'
        )
      );
    }, 2000);
  });
};
