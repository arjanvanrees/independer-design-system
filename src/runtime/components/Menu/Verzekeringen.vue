<template>
  <div class="min-w-[336px] p-3 bg-white rounded-lg rounded-tl-none">
    <ul>
      <h4 class="pt-4 px-3 pb-2 font-serif text-purple-dark font-bold">
        Auto
      </h4>
      <IndSubmenuItem
        label="Autoverzekering"
        to="/auto"
      />
      <IndSubmenuItem label="Bestelbusverzekering" />
      <IndSubmenuItem
        label="Fietsverzekering"
        to="/fiets"
      />
      <IndSubmenuItem label="Scooter- en brommervezekering" />
      <IndSubmenuItem label="Speed pedelecverzekering" />

      <h4 class="pt-4 px-3 pb-2 font-serif text-purple-dark font-bold">
        Huis
      </h4>
      <IndSubmenuItem label="Huisdierverzekering" />
      <IndSubmenuItem label="Inboedel- en opstalverzekering" />

      <h4 class="pt-4 px-3 pb-2 font-serif text-purple-dark font-bold">
        Persoonlijk
      </h4>
      <IndSubmenuItem label="Aansprakelijkheidsverzekering" />
      <IndSubmenuItem label="Cyberverzekering" />
      <IndSubmenuItem label="Overlijdensrisicoverzekering" />
      <IndSubmenuItem label="Rechtsbijstandverzekering" />
      <IndSubmenuItem label="Reisverzekering" />
      <IndSubmenuItem label="Veilig online verzekering" />
      <IndSubmenuItem
        label="Zorgverzekering"
        to="/zorg"
      />
    </ul>
  </div>
</template>
