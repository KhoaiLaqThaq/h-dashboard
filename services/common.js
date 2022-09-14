export function useCurrentsRole(rolesCurrent, rolesAccepted) {
  console.log('rolesAccepted', rolesAccepted);
  if (rolesCurrent && rolesAccepted) {
    for (let i = 0; i < rolesAccepted.length; i++) {
      if (rolesCurrent.includes(rolesAccepted[i])) return true;
    }
    return false;
  }
}
