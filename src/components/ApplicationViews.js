import React from "react";
import { Route } from "react-router-dom";
import { AnimalDetail } from "./animal/AnimalDetail";
import { AnimalForm } from "./animal/AnimalForm";
import { AnimalList } from "./animal/AnimalList";
import { AnimalProvider } from "./animal/AnimalProvider";
import { AnimalSearch } from "./animal/AnimalSearch";
import { CustomerList } from "./customer/CustomerList";
import { CustomerProvider } from "./customer/CustomerProvider";
import { EmployeeDetail } from "./employees/EmployeeDetail";
import { EmployeeForm } from "./employees/EmployeeForm";
import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeProvider } from "./employees/EmployeeProvider";
import { LocationDetail } from "./location/LocationDetail";
import { LocationForm } from "./location/LocationForm";
import { LocationList } from "./location/LocationList";
import { LocationProvider } from "./location/LocationProvider";

export const ApplicationViews = () => {
  return (
    <>
      {/* locations */}

      <LocationProvider>
        <Route exact path="/">
          <LocationList />
        </Route>

        <Route exact path="/locations">
          <LocationList />
        </Route>

        <Route exact path="/locations/detail/:locationId(\d+)">
          <LocationDetail />
        </Route>

        <Route exact path="/locations/create">
          <LocationForm />
        </Route>

        <Route path="/locations/edit/:locationId(\d+)">
          <LocationForm />
        </Route>
      </LocationProvider>

      {/* animals */}

      <AnimalProvider>
        <Route exact path="/animals">
          <AnimalSearch/>
          <AnimalList />
        </Route>

        <Route exact path="/animals/detail/:animalId(\d+)">
          <AnimalDetail />
        </Route>

        <Route path="/animals/edit/:animalId(\d+)">
          <LocationProvider>
            <CustomerProvider>
              <AnimalForm />
            </CustomerProvider>
          </LocationProvider>
        </Route>

        <Route exact path="/animals/create">
          <LocationProvider>
            <CustomerProvider>
              <AnimalForm />
            </CustomerProvider>
          </LocationProvider>
        </Route>
      </AnimalProvider>

      {/*customers */}

      <CustomerProvider>
        <Route path="/customers">
          <CustomerList />
        </Route>
      </CustomerProvider>

      {/* employees */}

      <EmployeeProvider>
        <Route exact path="/employees">
          <EmployeeList />
        </Route>

        <Route exact path="/employees/detail/:employeeId(\d+)">
          <EmployeeDetail />
        </Route>

        <LocationProvider>
          <Route exact path="/employees/create">
            <EmployeeForm />
          </Route>

          <Route path="/employees/edit/:employeeId(\d+)">
            <EmployeeForm />
          </Route>
        </LocationProvider>
      </EmployeeProvider>
    </>
  );
};
