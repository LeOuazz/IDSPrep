#!/usr/bin/env bash
#
# simple-interest.sh
# Calcule l’intérêt simple
# Usage : ./simple-interest.sh <capital> <taux_annuel_en_pourcent> <duree_en_annees>

if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <capital> <taux_annuel_%> <duree_années>"
  exit 1
fi

capital=$1
taux=$2
duree=$3

# Calcul de l'intérêt :
# interest = capital * taux * duree / 100
interest=$(awk "BEGIN { printf \"%.2f\", ($capital * $taux * $duree) / 100 }")

echo "Pour un capital de ${capital}, au taux de ${taux}% sur ${duree} an(s) :"
echo "Intérêt simple = ${interest}"
