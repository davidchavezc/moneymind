def calcular_intereses(begbal, intrate, duepmt):
    montrate = intrate / 1200
    intgen = montrate * begbal
    vatgen = intgen * 0.16
    totpmt = vatgen + intgen + begbal
    pendingpmt = totpmt - duepmt
    return intgen, vatgen, pendingpmt
# Operaciones básicas para calculo de intereses
def float_convert(string):
    try:
        clean_string = string.replace(",","").replace("%","")
        return float(clean_string)
    except ValueError:
        raise ValueError("Error de lectura. Ingrese solamente carácteres numéricos e intente de nuevo.")
# Operaciones para limpiar la información que el cliente ingresa
try:
    name = input("¿Qué tarjeta de crédito manejas? ")
    intrate = float_convert(input("¿Qué tasa de interes tiene? "))
    begbal = float_convert(input("¿Cuál fue tu saldo al corte? "))
    duepmt = float_convert(input("Cuál es tu pago mínimo? "))
    begcov = input("¿Cubriste tu pago para no generar intereses? (sí o no) ").lower().strip()
    # Se solicitan los datos de nombre de la tdc, tasa de interés, saldo al corte, pago mínimo, y si cubrió su pago para no generar interes
    if begcov == "si":
        ontime = input("¿Realizó el pago a tiempo?").lower().strip()
        if ontime == "si":
            print("Su cuenta no tiene porque generar ningún tipo de interés.")
        else:
            duecov=input("¿Cubriste tu pago mínimo? ").lower().strip()
            if duecov == "si":
                intgen, vatgen, _ = calcular_intereses(begbal, intrate, duepmt)
                print(f"En la TDC {name}, su pago para no generar intereses es de ${begbal:,.2f} pesos.")
                print(f"Como ya cubrió su saldo al corte de manera extemporánea, deja pendiente solamente ${intgen:,.2f} pesos de interés y ${vatgen:,.2f} pesos de IVA sobre intereses")
            else:
                print("Consulte costos y comisiones, así como tasa de interés moratoria y penalizaciones por pago tardío con su banco")
    else:
        duecov = input("¿Cubriste tu pago mínimo? ").lower().strip()
        if duecov == "si":
            intgen, vatgen, pendingpmt = calcular_intereses(begbal, intrate, duepmt)
            print(f"En la TDC {name}, su pago para no generar intereses es de ${begbal:,.2f} pesos.")
            print(f"Como cubrió su pago mínimo, se le generarán ${intgen:,.2f} pesos de interés y ${vatgen:,.2f} pesos de IVA sobre intereses")
            print(f"Dejando pendiente solamente ${pendingpmt:,.2f} pesos.")

finally:
    print("Gracias por utilizar MoneyMind, ¡Que tengas un excelente día!")