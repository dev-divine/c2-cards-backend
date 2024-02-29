#!/bin/bash
cd "../../../../tmp"
for zip in *.zip; do
  unzip -o "$zip" -d "${zip%.*}"
done
