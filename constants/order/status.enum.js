export const displayStatus = (status) => {
  if (status)
    switch (status) {
      case 1:
        return 'pending';
      case 2:
        return 'approved';
      case 3:
        return 'exported';
      case 4:
        return 'rejected';
      case 99:
        return 'invoiced';
      default: 
        return 'unknown';
    }
  return '';
}

export const displayColorStatus = (status) => {
  if (status)
    switch(status) {
      case 1:
        return 'text-danger';
      case 99:
        return 'text-success';
      default:
        return 'text-primary';
    }
  return '';
}
