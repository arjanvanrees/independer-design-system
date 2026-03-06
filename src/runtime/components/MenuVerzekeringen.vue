<template>
    <div class="min-w-[336px] p-3 bg-white rounded-lg rounded-tl-none">
        <ul>
            <h4 class="pt-4 px-3 pb-2 font-serif text-purple-dark font-bold">Auto</h4>
            <ISubmenuItem label="Autoverzekering" to="/auto" />
            <ISubmenuItem label="Bestelbusverzekering" />
            <ISubmenuItem label="Fietsverzekering" to="/fiets" />
            <ISubmenuItem label="Scooter- en brommervezekering" />
            <ISubmenuItem label="Speed pedelecverzekering" />

            <h4 class="pt-4 px-3 pb-2 font-serif text-purple-dark font-bold">Huis</h4>
            <ISubmenuItem label="Huisdierverzekering" />
            <ISubmenuItem label="Inboedel- en opstalverzekering" />

            <h4 class="pt-4 px-3 pb-2 font-serif text-purple-dark font-bold">Persoonlijk</h4>
            <ISubmenuItem label="Aansprakelijkheidsverzekering" />
            <ISubmenuItem label="Cyberverzekering" />
            <ISubmenuItem label="Overlijdensrisicoverzekering" />
            <ISubmenuItem label="Rechtsbijstandverzekering" />
            <ISubmenuItem label="Reisverzekering" />
            <ISubmenuItem label="Veilig online verzekering" />
            <ISubmenuItem label="Zorgverzekering" to="/zorg" />
        </ul>
    </div>
</template>
