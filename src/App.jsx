import { useState } from "react";
import ExcelJS from "exceljs";
import saveAs from "file-saver";
import "./index.css";

const App = () => {
  const [editIndex, setEditIndex] = useState(null);

  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    idCliente: "",
    nombreEntidad: "",
    nombreContacto: "",
    telefono1: "",
    telefono2: "",
    email: "",
    fechaNacimiento: "",
    edad: "",
    domicilio: "",
    distritoProvincia: "",
    fechaDesembolso: "",
    plazoMes: "",
    montoDesembolsado: "",
    lineaDisponible: "",
    fechaPromocionar: "",
    observaciones: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Actualizar un cliente existente
      setClientes((prevClientes) => {
        const updatedClientes = [...prevClientes];
        updatedClientes[editIndex] = formData; // Actualizar los datos del cliente
        return updatedClientes;
      });
      setEditIndex(null); // Reiniciar el índice de edición
    } else {
      // Agregar un nuevo cliente
      setClientes((prevClientes) => [...prevClientes, formData]);
    }

    // Limpiar el formulario después de agregar/editar
    setFormData({
      idCliente: "",
      nombreEntidad: "",
      nombreContacto: "",
      telefono1: "",
      telefono2: "",
      email: "",
      fechaNacimiento: "",
      edad: "",
      domicilio: "",
      distritoProvincia: "",
      fechaDesembolso: "",
      plazoMes: "",
      montoDesembolsado: "",
      lineaDisponible: "",
      fechaPromocionar: "",
      observaciones: "",
    });
  };

  const exportToExcel = async () => {
    console.log(clientes); // Verificar el con
    console.log("Clientes:", clientes); // Agrega esta líneatenido de clientes
    if (clientes.length === 0) {
      alert("No hay clientes para exportar.");
      return;
    }

    const url = "/plantilla.xlsx"; // Cambia esto por la ruta de tu plantilla
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    const worksheet = workbook.getWorksheet(1); // Asumiendo que es la primera hoja

    let rowNumber = 3; // Comenzar en la fila 3
    let colStart = 2; // Comenzar en la columna B (índice 2)

    clientes.forEach((cliente) => {
      const row = worksheet.getRow(rowNumber);

      console.log("Exportando cliente:", cliente);
      row.getCell(colStart).value = cliente.idCliente; // ID de Cliente en la columna B
      row.getCell(colStart + 1).value = cliente.nombreEntidad; // Nombre de la entidad en la columna C
      row.getCell(colStart + 2).value = cliente.nombreContacto; // Nombre del contacto en la columna D
      row.getCell(colStart + 3).value = cliente.telefono1; // Teléfono 1 en la columna E
      row.getCell(colStart + 4).value = cliente.telefono2; // Teléfono 2 en la columna F
      row.getCell(colStart + 5).value = cliente.email; // Dirección de correo electrónico en la columna G
      row.getCell(colStart + 6).value = cliente.fechaNacimiento; // Fecha de nacimiento en la columna H
      row.getCell(colStart + 7).value = cliente.edad; // Edad en la columna I
      row.getCell(colStart + 8).value = cliente.domicilio; // Domicilio en la columna J
      row.getCell(colStart + 9).value = cliente.distritoProvincia; // Distrito/Provincia en la columna K
      row.getCell(colStart + 10).value = cliente.fechaDesembolso; // Fecha de desembolso en la columna L
      row.getCell(colStart + 11).value = cliente.plazoMes; // Plazo (meses) en la columna M
      row.getCell(colStart + 12).value = cliente.montoDesembolsado; // Monto desembolsado en la columna N
      row.getCell(colStart + 13).value = cliente.lineaDisponible; // Línea disponible en la columna O
      row.getCell(colStart + 14).value = cliente.fechaPromocionar; // Fecha a promocionar en la columna P
      row.getCell(colStart + 15).value = cliente.observaciones; // Observaciones en la columna Q

      row.commit(); // Guardar los cambios en la fila
      rowNumber++;
    });

    // Generar el archivo Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "Cartera_de_Clientes.xlsx");
  };

  const deleteCliente = (index) => {
    const nuevosClientes = clientes.filter((_, i) => i !== index);
    setClientes(nuevosClientes);
  };

  const editCliente = (index) => {
    const cliente = clientes[index];
    setFormData(cliente); 
    setEditIndex(index);
  };


  const clearClientes = () => {
    setClientes([]);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Cartera de Clientes
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="idCliente" className="block mb-2 font-semibold">
              ID Cliente
            </label>
            <input
              id="idCliente"
              name="idCliente"
              className="border p-2 rounded w-full"
              placeholder="ID Cliente"
              value={formData.idCliente}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="nombreEntidad" className="block mb-2 font-semibold">
              Nombre de la Entidad
            </label>
            <input
              id="nombreEntidad"
              name="nombreEntidad"
              className="border p-2 rounded w-full"
              placeholder="Nombre de la Entidad"
              value={formData.nombreEntidad}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="nombreContacto"
              className="block mb-2 font-semibold"
            >
              Nombre del Contacto
            </label>
            <input
              id="nombreContacto"
              name="nombreContacto"
              className="border p-2 rounded w-full"
              placeholder="Nombre del Contacto"
              value={formData.nombreContacto}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="telefono1" className="block mb-2 font-semibold">
              Teléfono 1
            </label>
            <input
              id="telefono1"
              name="telefono1"
              className="border p-2 rounded w-full"
              placeholder="Teléfono 1"
              value={formData.telefono1}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="telefono2" className="block mb-2 font-semibold">
              Teléfono 2
            </label>
            <input
              id="telefono2"
              name="telefono2"
              className="border p-2 rounded w-full"
              placeholder="Teléfono 2"
              value={formData.telefono2}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              className="border p-2 rounded w-full"
              type="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="fechaNacimiento"
              className="block mb-2 font-semibold"
            >
              Fecha de Nacimiento
            </label>
            <input
              id="fechaNacimiento"
              name="fechaNacimiento"
              className="border p-2 rounded w-full"
              type="date"
              value={formData.fechaNacimiento}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="edad" className="block mb-2 font-semibold">
              Edad
            </label>
            <input
              id="edad"
              name="edad"
              className="border p-2 rounded w-full"
              placeholder="Edad"
              value={formData.edad}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="domicilio" className="block mb-2 font-semibold">
              Domicilio
            </label>
            <input
              id="domicilio"
              name="domicilio"
              className="border p-2 rounded w-full"
              placeholder="Domicilio"
              value={formData.domicilio}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="distritoProvincia"
              className="block mb-2 font-semibold"
            >
              Distrito/Provincia
            </label>
            <input
              id="distritoProvincia"
              name="distritoProvincia"
              className="border p-2 rounded w-full"
              placeholder="Distrito/Provincia"
              value={formData.distritoProvincia}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="fechaDesembolso"
              className="block mb-2 font-semibold"
            >
              Fecha de Desembolso/Atención
            </label>
            <input
              id="fechaDesembolso"
              name="fechaDesembolso"
              className="border p-2 rounded w-full"
              type="date"
              value={formData.fechaDesembolso}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="plazoMes" className="block mb-2 font-semibold">
              Plazo (Meses)
            </label>
            <input
              id="plazoMes"
              name="plazoMes"
              className="border p-2 rounded w-full"
              placeholder="Plazo (Meses)"
              value={formData.plazoMes}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="montoDesembolsado"
              className="block mb-2 font-semibold"
            >
              Monto Desembolsado
            </label>
            <input
              id="montoDesembolsado"
              name="montoDesembolsado"
              className="border p-2 rounded w-full"
              placeholder="Monto Desembolsado"
              value={formData.montoDesembolsado}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="lineaDisponible"
              className="block mb-2 font-semibold"
            >
              Línea Disponible
            </label>
            <input
              id="lineaDisponible"
              name="lineaDisponible"
              className="border p-2 rounded w-full"
              placeholder="Línea Disponible"
              value={formData.lineaDisponible}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="fechaPromocionar"
              className="block mb-2 font-semibold"
            >
              Fecha a Promocionar
            </label>
            <input
              id="fechaPromocionar"
              name="fechaPromocionar"
              className="border p-2 rounded w-full"
              type="date"
              value={formData.fechaPromocionar}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="observaciones" className="block mb-2 font-semibold">
            Observaciones
          </label>
          <textarea
            id="observaciones"
            name="observaciones"
            className="border p-2 rounded w-full"
            placeholder="Observaciones"
            value={formData.observaciones}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {editIndex !== null ? "Actualizar Cliente" : "Agregar Cliente"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Lista de Clientes</h2>

      {clientes.length === 0 ? (
        <p className="text-gray-500">No hay clientes en la lista.</p>
      ) : (
        <>
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">ID Cliente</th>
                <th className="p-2">Nombre Entidad</th>
                <th className="p-2">Nombre Contacto</th>
                <th className="p-2">Teléfono 1</th>
                <th className="p-2">Teléfono 2</th>
                <th className="p-2">Email</th>
                <th className="p-2">Fecha Nacimiento</th>
                <th className="p-2">Edad</th>
                <th className="p-2">Domicilio</th>
                <th className="p-2">Distrito/Provincia</th>
                <th className="p-2">Fecha Desembolso</th>
                <th className="p-2">Plazo (Meses)</th>
                <th className="p-2">Monto Desembolsado</th>
                <th className="p-2">Línea Disponible</th>
                <th className="p-2">Fecha a Promocionar</th>
                <th className="p-2">Observaciones</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{cliente.idCliente}</td>
                  <td className="p-2">{cliente.nombreEntidad}</td>
                  <td className="p-2">{cliente.nombreContacto}</td>
                  <td className="p-2">{cliente.telefono1}</td>
                  <td className="p-2">{cliente.telefono2}</td>
                  <td className="p-2">{cliente.email}</td>
                  <td className="p-2">{cliente.fechaNacimiento}</td>
                  <td className="p-2">{cliente.edad}</td>
                  <td className="p-2">{cliente.domicilio}</td>
                  <td className="p-2">{cliente.distritoProvincia}</td>
                  <td className="p-2">{cliente.fechaDesembolso}</td>
                  <td className="p-2">{cliente.plazoMes}</td>
                  <td className="p-2">{cliente.montoDesembolsado}</td>
                  <td className="p-2">{cliente.lineaDisponible}</td>
                  <td className="p-2">{cliente.fechaPromocionar}</td>
                  <td className="p-2">{cliente.observaciones}</td>
                  <td className="p-2 flex space-x-2">
                    <button
                      onClick={() => deleteCliente(index)}
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => editCliente(index)}
                      className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between">
            <button
              onClick={exportToExcel}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Exportar a Excel
            </button>
            <button
              onClick={clearClientes}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Limpiar Clientes
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
