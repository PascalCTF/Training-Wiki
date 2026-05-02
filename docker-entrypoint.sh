#!/bin/sh
set -eu

mkdir -p /var/run/sshd

# Generate host keys if missing
ssh-keygen -A >/dev/null 2>&1 || true

# Set root password at runtime (do NOT bake secrets into image layers)
if [ "${ROOT_PASSWORD:-}" != "" ]; then
  echo "root:${ROOT_PASSWORD}" | chpasswd
else
  echo "[entrypoint] ROOT_PASSWORD not set; SSH password login for root will fail." >&2
fi

# Start SSH daemon
/usr/sbin/sshd

# Serve Docusaurus on all interfaces for Docker
exec npm run serve -- --host 0.0.0.0 --port 3000
