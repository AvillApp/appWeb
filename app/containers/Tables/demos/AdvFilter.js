import React, {useState, useEffect }from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Button}  from '@material-ui/core/';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { api } from "../../../api/db";

const styles = theme => ({
  table: {
    '& > div': {
      overflow: 'auto'
    },
    '& table': {
      '& td': {
        wordBreak: 'keep-all'
      },
      [theme.breakpoints.down('md')]: {
        '& td': {
          height: 60,
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }
    }
  }
});
function AdvFilter(props) {

  const [pedidos, setPedidos] = useState([]);
  const [isProd, setIsProd] = useState(false); 
  const [open, setOpen] = useState(false);
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculo, setVehiculo] = useState(); 
  const [tiempo, setTiempo] = useState();
  const [precio, setPrecio] = useState();
  const [idPedido, setIdPedido] = useState();
  const [estadoPed, setEstadoPed] = useState();
  const [totalPed, setTotalPed] = useState();


  const obtenerPedidos = async () => {
    
    const new_pedidos = await axios.get(`${api}pedidos/`);
    setPedidos(new_pedidos.data);

    if (new_pedidos.data.length>0){
     // console.log("Ingresó aqui")
      //setTotalPed(3)
      setIsProd(true)
      
    }
  }

  useEffect(()=>{

    if(!isProd){
      const interval = setInterval(() => {
          obtenerPedidos();
       }, 5000);
       return () => clearInterval(interval)
    }

  }, [])
  

  const columns = [
    {
     name: "personas.name",
     label: "Cliente",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "emision",
     label: "Recoger",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "destino",
     label: "Destino",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "telealt",
     label: "Teléfono",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
      name: "solicitud",
      label: "Servicio",
      options: {
       filter: true,
       sort: false,
      }
    },
    {
      name: "estado",
      label: "Estado",
      options: {
       filter: true,
       sort: false,
       customBodyRender: (value) => {
            if (value === 3)
            return "En espera"
            if (value === 4)
            return "Cancelado"
            if (value === 6)
            return "Terminado"
            if (value === 5)
            return "En camino"
            if (value === 7)
            return "Confirmado"
       }
      }
     },
     {
      name: "vehiculo.name",
      label: "Vehiculo",
      options: {
       filter: true,
       sort: false,
      }
     },
     {
      name: "vehiculo.persona.name",
      label: "Conductor",
      options: {
       filter: true,
       sort: false,
      }
     },
     {
      name: "id",
      label: "Cambiar",
      options: {
        filter: true,
        sortDescFirst: true,
        sortThirdClickReset: true,
        sort: true,
        customBodyRender: (value) => (
         <Button variant="contained" color="primary" onClick={()=> handleClickOpen(value)} > Cambiar </Button>
        )
      }
     },
     {
      name: "created",
      label: "Recepeción",
      options: {
        filter: true,
      }
     },
     {
      name: "modified",
      label: "Actualizado",
      options: {
        filter: true,
      }
     },
   ];
   
  const data = pedidos;

  const options = {
    //filterType: 'dropdown',
    responsive: 'stacked',
    //print: true,
    rowsPerPage: 10,
    page: 0,
    sortOrder: {
      name: "id",
      direction: 'desc'
    }
  };

  const { classes } = props;

  const handleClickOpen = async (id) => {


    console.log("valor del pedido", id)

    // Consultamos los datos del pedido

    const dt_pedido = await axios.get(`${api}pedidos/${id}`);
    setIdPedido(id)
    setTiempo(dt_pedido.data[0].tiempo);
    setPrecio(dt_pedido.data[0].precio);
    if(dt_pedido.data[0].vehiculo)
    setVehiculo(dt_pedido.data[0].vehiculo.id)

    const new_vehiculos = await axios.get(`${api}vehiculo/`);
    setVehiculos(new_vehiculos.data);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const OpenEmergen = () => {

    let separar = vehiculo.split('|')

    if (separar[1])
      window.open(`https://api.whatsapp.com/send?phone=57${separar[1]}`, '_blank', 'toolbar=0,location=0,menubar=0');
  }

  const UpdatePedido = async () => {
    console.log(idPedido)

    let separar = vehiculo.split('|')
    const objeto = {
      "estado": parseInt(estadoPed),
      "vehiculo": parseInt(separar[0]),
      "precio": parseInt(precio),
      "tiempo": parseInt(tiempo),    
    }
    const update_pedido = await axios.put(`${api}pedidos/update/${idPedido}/`, objeto);
    setIsProd(false)
    setOpen(false);
  }

  return (
    <>
    <div className={classes.table}>
      <MUIDataTable
        title="Lista de Pedidos"
        data={data}
        columns={columns}
        options={options}
      />
    </div>

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Actualizar Orden</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tiempo"
            type="number"
            value={tiempo}
            fullWidth
            onChange={(e)=> setTiempo(e.target.value)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Precio"
            type="number"
            value={precio}
            fullWidth
            onChange={(e)=> setPrecio(e.target.value)}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={vehiculo}
            onChange={(e)=> setVehiculo(e.target.value)}
            defaultChecked={vehiculo}
            defaultValue={vehiculo}
          >
            {
              vehiculos.map(data => (
              <MenuItem value={`${data.id}|${data.persona.phone}`}>
                {`${data.placa}-${data.modelo}-${data.marca}-${data.persona.name}`}
              </MenuItem>
              ))} 
              
          </Select>
          <Button onClick={OpenEmergen} color="primary">
            Chatear 
          </Button>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={estadoPed}
            onChange={(e)=> setEstadoPed(e.target.value)}
          >
            <MenuItem value="4">Cancelado</MenuItem>
            <MenuItem value="5">En camino</MenuItem>
            <MenuItem value="6">Terminado</MenuItem>
              
          </Select> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={UpdatePedido} color="primary">
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvFilter);
