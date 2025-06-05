const API_URL = 'https://api.truistsurgebank.org/admin';

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data.users;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};

export const fundUserAccount = async (userId, amount, description) => {
  try {
    const token = localStorage.getItem('token');

    // Parse and validate amount
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      throw new Error('Please enter a valid amount greater than 0');
    }
    const response = await fetch(`${API_URL}/fund-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        amount: numericAmount, // Ensure amount is a number
        description,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Error funding user account:', error);
    throw error;
  }
};

export const deleteUserAccount = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};

export const getAllTransactions = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data.transactions;
  } catch (error) {
    console.error('Error getting all transactions:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `https://api.truistsurgebank.org/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data.user;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const getAllLoans = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/loans`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Error getting all loans:', error);
    throw error;
  }
};

export const updateLoanStatus = async (loanId, status) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/loans/${loanId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Error updating loan status:', error);
    throw error;
  }
};

export const toggleUserBlock = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/users/${userId}/toggle-block`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data.user;
  } catch (error) {
    console.error('Error toggling user block status:', error);
    throw error;
  }
};
